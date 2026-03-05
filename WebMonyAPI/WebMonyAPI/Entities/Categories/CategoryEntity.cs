using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;
using WebMonyAPI.Entities.Identity;

namespace WebMonyAPI.Entities.Categories;

public class CategoryEntity : BaseEntity<long>
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Icon { get; set; }
    public long CategoryTypeId { get; set; }
    public CategoryTypeEntity? CategoryType { get; set; }
    
    [ForeignKey(nameof(User))]
    public long UserId { get; set; }
    public UserEntity? User { get; set; }
}