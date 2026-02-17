namespace WebMonyAPI.Dtos.Users;

public class LoginDto
{
    public string PhoneNumber { get; set; } = null!;
    public string Code { get; set; } = null!;
}
