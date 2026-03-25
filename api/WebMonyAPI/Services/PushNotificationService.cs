using System.Text;
using System.Text.Json;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Services;

public class PushNotificationService(IHttpClientFactory httpClientFactory) : IPushNotificationService
{
    public async Task SendNotificationAsync(string pushToken, string title, string message)
    {
        if (string.IsNullOrEmpty(pushToken)) return;

        var client = httpClientFactory.CreateClient();
        var payload = new
        {
            to = pushToken,
            title = title,
            body = message,
            sound = "default"
        };

        var content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
        await client.PostAsync("https://exp.host/--/api/v2/push/send", content);
    }
}
