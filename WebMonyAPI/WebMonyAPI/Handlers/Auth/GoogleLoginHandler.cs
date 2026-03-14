using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;
using System.Text.Json;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using Microsoft.IdentityModel.Protocols;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Data;

namespace WebMonyAPI.Handlers.Auth;

public class GoogleLoginHandler(UserManager<UserEntity> userManager,
    IJWTTokenService jwtTokenService,
    IMapper mapper,
    IImageService imageService,
    RoleManager<RoleEntity> roleManager,
    AppDbContext context,
    IConfiguration configuration,
    IUserOnboardingService onboardingService) : IRequestHandler<GoogleLoginCommand, TokenDto>
{
    public async Task<TokenDto> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        var token = request.Model.Token;
        using var httpClient = new HttpClient();

        HttpResponseMessage? response = null;
        string? json = null;
        GoogleAccountModel? googleUser = null;

        // Detect if the provided token is an ID token (JWT) or an access token.
        // ID tokens are JWTs (three parts separated by dots). For id_token validate locally via Google's OpenID Connect keys.
        if (!string.IsNullOrWhiteSpace(token) && token.Split('.').Length == 3)
        {
            try
            {
                var discovery = "https://accounts.google.com/.well-known/openid-configuration";
                var configManager = new ConfigurationManager<OpenIdConnectConfiguration>(discovery, new OpenIdConnectConfigurationRetriever());
                var openIdConfig = await configManager.GetConfigurationAsync(cancellationToken);

                var clientId = configuration["Google:ClientId"] ?? configuration["JWT:GoogleClientId"];

                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidIssuers = new[] { "accounts.google.com", "https://accounts.google.com" },
                    // Only validate audience when a client id is provided in configuration
                    ValidateAudience = !string.IsNullOrWhiteSpace(clientId),
                    ValidAudience = !string.IsNullOrWhiteSpace(clientId) ? clientId : null,
                    ValidateLifetime = true,
                    IssuerSigningKeys = openIdConfig.SigningKeys
                };

                var handler = new JwtSecurityTokenHandler();
                var principal = handler.ValidateToken(token, validationParameters, out var validatedToken);

                // Try to read common claim types from the validated token. JwtSecurityTokenHandler may map claim types
                // to full URIs (e.g. http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier),
                // so check several common names.
                string? id = principal.FindFirst("sub")?.Value
                    ?? principal.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? principal.FindFirst("id")?.Value;

                string? email = principal.FindFirst(ClaimTypes.Email)?.Value
                    ?? principal.FindFirst("email")?.Value;

                string? name = principal.FindFirst("name")?.Value
                    ?? principal.FindFirst(ClaimTypes.GivenName)?.Value
                    ?? principal.FindFirst(ClaimTypes.Name)?.Value;

                string? picture = principal.FindFirst("picture")?.Value;

                googleUser = new GoogleAccountModel
                {
                    Id = id,
                    Email = email,
                    Name = name,
                    Picture = picture
                };
            }
            catch
            {
                // validation failed
                return new TokenDto();
            }
        }
        else
        {
            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var userInfo = "https://www.googleapis.com/oauth2/v2/userinfo";
            response = await httpClient.GetAsync(userInfo, cancellationToken);
        }
        // If we didn't get googleUser from id_token validation, use the userinfo response
        if (googleUser == null)
        {
            if (response == null)
                return new TokenDto();

            json = await response.Content.ReadAsStringAsync(cancellationToken);

            if (!response.IsSuccessStatusCode)
            {
                // Include response body in case of failure for easier debugging (can be inspected in debugger)
                return new TokenDto();
            }

            googleUser = JsonSerializer.Deserialize<GoogleAccountModel>(json);
            if (googleUser == null)
                return new TokenDto();
        }

        var existingUser = await userManager.FindByEmailAsync(googleUser.Email);
        if (existingUser != null)
        {
            var userLoginGoogle = await userManager.FindByLoginAsync("Google", googleUser.Id);

            if (userLoginGoogle == null)
            {
                await userManager.AddLoginAsync(existingUser, new UserLoginInfo("Google", googleUser.Id, "Google"));
            }

            var jwtToken = await jwtTokenService.CreateTokenAsync(existingUser);
            return jwtToken;
        }
        else
        {
            var user = mapper.Map<UserEntity>(googleUser);

            if (!string.IsNullOrEmpty(googleUser.Picture))
            {
                user.Image = await imageService.SaveImageFromUrlAsync(googleUser.Picture);
            }

            var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    await userManager.AddLoginAsync(user, new UserLoginInfo("Google", googleUser.Id ?? string.Empty, "Google"));
                    if (!await roleManager.RoleExistsAsync("User"))
                    {
                        await roleManager.CreateAsync(new RoleEntity { Name = "User" });
                    }

                    await userManager.AddToRoleAsync(user, "User");

                    await onboardingService.SeedInitialDataAsync(user, cancellationToken);

                    var jwtToken = await jwtTokenService.CreateTokenAsync(user);
                    return jwtToken;
                }
        }

        return new TokenDto();
    }
}
