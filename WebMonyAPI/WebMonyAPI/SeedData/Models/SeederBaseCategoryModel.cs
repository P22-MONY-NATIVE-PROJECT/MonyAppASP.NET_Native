namespace WebMonyAPI.SeedData.Models;

public class SeederBaseCategoryModel
{
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    /// <summary> "Expense" | "Income" | "Saving" </summary>
    public string CategoryType { get; set; } = string.Empty;
}
