using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Dtos.Auth;

namespace WebMonyAPI.Interfaces;

public interface IJWTTokenService
{
    Task<TokenDto> CreateTokenAsync(UserEntity user);
}

