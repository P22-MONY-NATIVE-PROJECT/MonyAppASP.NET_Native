namespace WebMonyAPI.Interfaces;

public interface IPushNotificationService
{
    Task SendToUserAsync(long userId, string title, string message);
}
