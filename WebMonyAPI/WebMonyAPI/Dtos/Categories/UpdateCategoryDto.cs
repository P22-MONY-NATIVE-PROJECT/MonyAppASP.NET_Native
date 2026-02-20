using Microsoft.AspNetCore.Http;

namespace WebMonyAPI.Dtos.Categories;

public class UpdateCategoryDto
{
    public long Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public IFormFile? Icon { get; set; }
}
