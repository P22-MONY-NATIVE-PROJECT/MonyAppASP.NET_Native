namespace WebMonyAPI.Dtos.Auth;

public class TokenDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}

public class RefreshRequestDto
{
    public string RefreshToken { get; set; } = string.Empty;
}
