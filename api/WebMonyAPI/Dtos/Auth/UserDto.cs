namespace WebMonyAPI.Dtos.Auth;

public class UserDto
{
    public Guid Id { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string? Image { get; set; }
    public DateTime CreatedAt { get; set; }
}
