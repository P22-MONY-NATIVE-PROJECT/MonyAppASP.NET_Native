using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using System.Net.Http.Headers;
using System.Text.Json;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Auth;

public class GoogleLoginHandler(UserManager<UserEntity> userManager,
    IJWTTokenService jwtTokenService,
    IMapper mapper,
    IImageService imageService) : IRequestHandler<GoogleLoginCommand, TokenDto>
{
    public async Task<TokenDto> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        var token = request.Model.Token;
        using var httpClient = new HttpClient();
        httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

        string userInfo = "https://www.googleapis.com/oauth2/v2/userinfo";
        var response = await httpClient.GetAsync(userInfo, cancellationToken);

        if (!response.IsSuccessStatusCode)
            return new TokenDto();

        var json = await response.Content.ReadAsStringAsync(cancellationToken);

        var googleUser = JsonSerializer.Deserialize<GoogleAccountModel>(json);
        if (googleUser == null)
            return new TokenDto();

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
                result = await userManager.AddLoginAsync(user, new UserLoginInfo("Google", googleUser.Id, "Google"));
                await userManager.AddToRoleAsync(user, "User");
                var jwtToken = await jwtTokenService.CreateTokenAsync(user);
                return jwtToken;
            }
        }

        return new TokenDto();
    }
}
