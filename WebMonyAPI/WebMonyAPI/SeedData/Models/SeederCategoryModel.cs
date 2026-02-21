namespace WebMonyAPI.SeedData.Models;

public class SeederCategoryModel
{
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public List<SeederCategoryModel>? Categories { get; set; }
}
