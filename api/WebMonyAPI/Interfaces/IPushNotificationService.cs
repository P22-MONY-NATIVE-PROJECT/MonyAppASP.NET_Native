namespace WebMonyAPI.Interfaces;

public interface IPushNotificationService
{
    Task SendNotificationAsync(string pushToken, string title, string message);
}
