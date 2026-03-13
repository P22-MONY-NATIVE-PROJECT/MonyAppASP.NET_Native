namespace WebMonyAPI.Dtos.Auth;

public class AccountChangePasswordDto
{
    public string OldPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}
