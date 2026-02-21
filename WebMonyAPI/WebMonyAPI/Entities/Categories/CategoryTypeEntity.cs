using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Categories;

[Table("tbl_category_types_entity")]
public class CategoryTypeEntity : BaseEntity<long>
{
    public string Name { get; set; } = string.Empty;
}
