namespace WebMonyAPI.Dtos.Auth;

public class AccountValidateResetTokenDto
{
    public string Email { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
}
