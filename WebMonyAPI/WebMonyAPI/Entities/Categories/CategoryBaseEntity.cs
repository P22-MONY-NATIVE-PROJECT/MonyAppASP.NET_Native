using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Categories;

[Table("tbl_categories_entity")]
public class CategoryBaseEntity : BaseEntity<long>
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Icon { get; set; }

    [ForeignKey(nameof(CategoryType))]
    public long CategoryTypeId { get; set; }
    public CategoryTypeEntity? CategoryType { get; set; }
}