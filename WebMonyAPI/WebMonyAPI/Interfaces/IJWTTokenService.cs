using WebMonyAPI.Entities.Identity;

namespace WebMonyAPI.Interfaces;

public interface IJWTTokenService
{
    Task<string> CreateTokenAsync(UserEntity user);
}
