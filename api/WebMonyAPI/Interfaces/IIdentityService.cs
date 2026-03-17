namespace WebMonyAPI.Interfaces;

public interface IIdentityService
{
    Task<long> GetUserIdAsync();
}
