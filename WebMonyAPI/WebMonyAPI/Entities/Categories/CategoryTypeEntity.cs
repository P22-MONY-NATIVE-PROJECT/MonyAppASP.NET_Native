using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Categories;

[Table("tblCategoryTypes")]
public class CategoryTypeEntity : BaseEntity<long>
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    public string? Icon { get; set; }
    public ICollection<CategoryEntity>? Categories { get; set; }
}
