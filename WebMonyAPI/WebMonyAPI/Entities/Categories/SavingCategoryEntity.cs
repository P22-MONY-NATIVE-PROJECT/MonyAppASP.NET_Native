using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Categories;

[Table("tbl_savings_category")]
public class SavingCategoryEntity : BaseEntity<long>
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;
    public string? Icon { get; set; }
}
