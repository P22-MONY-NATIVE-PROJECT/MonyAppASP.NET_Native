using System.Text.Json.Serialization;

namespace WebMonyAPI.Dtos.Auth;

public class GoogleAccountDto
{
    [JsonPropertyName("id")]
    public string GoogleId { get; set; } = string.Empty;

    [JsonPropertyName("email")]
    public string Email { get; set; } = string.Empty;

    [JsonPropertyName("given_name")]
    public string FirstName { get; set; } = string.Empty;
    [JsonPropertyName("family_name")]
    public string LastName { get; set; } = string.Empty;
    [JsonPropertyName("picture")]
    public string Picture { get; set; } = string.Empty;
}
