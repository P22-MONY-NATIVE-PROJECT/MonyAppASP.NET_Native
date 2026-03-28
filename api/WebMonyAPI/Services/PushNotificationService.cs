using WebMonyAPI.Interfaces;
using Microsoft.AspNetCore.SignalR;
using WebMonyAPI.Hubs;

namespace WebMonyAPI.Services;

public class PushNotificationService(IHubContext<NotificationHub> hubContext) : IPushNotificationService
{
    public async Task SendToUserAsync(long userId, string title, string message)
    {
        Console.WriteLine($"[SignalR Service] Sending notification to user {userId}: {title} - {message}");
        
        await hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveNotification", new { title, message });
        await hubContext.Clients.Group($"User_{userId}").SendAsync("ReceiveNotification", new { title, message });
    }
}



