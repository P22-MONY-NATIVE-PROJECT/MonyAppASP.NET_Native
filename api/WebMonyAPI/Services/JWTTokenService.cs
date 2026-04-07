using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Data;
using Microsoft.EntityFrameworkCore;

namespace WebMonyAPI.Services;

public class JWTTokenService(IConfiguration configuration,
    UserManager<UserEntity> userManager) : IJWTTokenService
{
    public async Task<TokenDto> CreateTokenAsync(UserEntity user)
    {
        string key = configuration["JWT:Key"]!;

        var claims = new List<Claim>
        {
            new Claim("email", user.Email ?? ""),
            new Claim("id", user.Id.ToString()),
            new Claim("name", $"{user.FirstName} {user.LastName}"),
            new Claim("image", user.Image != null? user.Image : "")
        };

        foreach (var role in await userManager.GetRolesAsync(user))
        {
            claims.Add(new Claim("role", role));
        }

        var keyBytes = System.Text.Encoding.UTF8.GetBytes(key);
        var signingKey = new SymmetricSecurityKey(keyBytes);

        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        // Issued for a very long time (100 years)
        var accessToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddYears(100),
            signingCredentials: signingCredentials
        );

        string accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

        return new TokenDto
        {
            AccessToken = accessTokenString
        };
    }
}


