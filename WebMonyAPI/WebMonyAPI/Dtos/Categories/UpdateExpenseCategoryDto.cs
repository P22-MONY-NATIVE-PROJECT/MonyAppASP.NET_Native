namespace WebMonyAPI.Dtos.Categories;

public class UpdateExpenseCategoryDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Icon { get; set; }
}
