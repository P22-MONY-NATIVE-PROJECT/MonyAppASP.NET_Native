using WebMonyAPI.Entities.Identity;

namespace WebMonyAPI.Interfaces;

public interface IUserOnboardingService
{
    Task SeedInitialDataAsync(UserEntity user, CancellationToken cancellationToken = default);
}
