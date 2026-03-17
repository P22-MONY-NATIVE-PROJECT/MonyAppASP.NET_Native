namespace WebMonyAPI.SeedData.Models;

public class SeederUserModel
{
    public string Email { get; set; } = "";
    public string FirstName { get; set; } = "";
    public string LastName { get; set; } = "";
    public string Image { get; set; } = "";
    public string Password { get; set; } = "";
    public List<string> Roles { get; set; } = new();
}
