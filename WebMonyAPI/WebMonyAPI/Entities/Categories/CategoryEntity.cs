using System.ComponentModel.DataAnnotations;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Categories;

public class CategoryEntity : BaseEntity<long>
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Icon { get; set; }
    public long CategoryTypeId { get; set; }
    public CategoryTypeEntity? CategoryType { get; set; }
}