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
    UserManager<UserEntity> userManager,
    AppDbContext context) : IJWTTokenService
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

        var accessToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(1),
            signingCredentials: signingCredentials
        );

        string accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

        var refreshTokenBytes = new byte[64];
        using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
        {
            rng.GetBytes(refreshTokenBytes);
        }

        string refreshToken = Convert.ToBase64String(refreshTokenBytes);

        var tokenEntity = new RefreshTokenEntity
        {
            Token = refreshToken,
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddDays(30),
            CreatedAt = DateTime.UtcNow
        };

        await context.RefreshTokens.AddAsync(tokenEntity);
        await context.SaveChangesAsync();

        return new TokenDto
        {
            AccessToken = accessTokenString,
            RefreshToken = refreshToken
        };
    }

    public async Task<TokenDto?> RefreshTokenAsync(string refreshToken)
    {
        var tokenEntity = await context.RefreshTokens
            .FirstOrDefaultAsync(t => t.Token == refreshToken);

        if (tokenEntity == null || tokenEntity.IsRevoked || tokenEntity.ExpiresAt <= DateTime.UtcNow)
            return null;

        var user = await userManager.FindByIdAsync(tokenEntity.UserId.ToString());
        if (user == null)
            return null;

        var claims = new List<Claim>
        {
            new Claim("email", user.Email ?? ""),
            new Claim("name", $"{user.FirstName} {user.LastName}"),
            new Claim("image", user.Image != null? user.Image : "")
        };

        foreach (var role in await userManager.GetRolesAsync(user))
        {
            claims.Add(new Claim("role", role));
        }

        var key = configuration["JWT:Key"]!;
        var keyBytes = System.Text.Encoding.UTF8.GetBytes(key);
        var signingKey = new SymmetricSecurityKey(keyBytes);
        var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);

        var accessToken = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(1),
            signingCredentials: signingCredentials
        );

        string accessTokenString = new JwtSecurityTokenHandler().WriteToken(accessToken);

        return new TokenDto { AccessToken = accessTokenString, RefreshToken = refreshToken };
    }
}
