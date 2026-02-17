namespace WebMonyAPI.Dtos.Users;

public class GetUserDto
{
    public string? Search { get; set; }
    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
