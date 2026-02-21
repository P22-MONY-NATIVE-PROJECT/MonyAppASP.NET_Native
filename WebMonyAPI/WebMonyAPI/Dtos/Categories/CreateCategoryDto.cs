using Microsoft.AspNetCore.Http;

namespace WebMonyAPI.Dtos.Categories;

public class CreateCategoryDto
{
    public string Name { get; set; } = string.Empty;

    public IFormFile? Icon { get; set; }
}
