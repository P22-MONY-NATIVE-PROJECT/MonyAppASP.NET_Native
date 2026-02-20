using Microsoft.AspNetCore.Http;

namespace WebMonyAPI.Dtos.Categories;

public class CreateExpenseCategoryDto
{
    public string Name { get; set; } = string.Empty;

    public IFormFile? Icon { get; set; }
}
