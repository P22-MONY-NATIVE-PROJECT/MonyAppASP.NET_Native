using Microsoft.AspNetCore.Identity;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Entities.Identity;

public class UserEntity : IdentityUser<long>
{
    public bool IsDeleted { get; set; } = false;
    public DateTime DateCreated { get; set; } = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
    public string? FirstName { get; set; } = string.Empty;
    public string? LastName { get; set; } = string.Empty;
    public string? Image { get; set; } = string.Empty;
    public string? PushToken { get; set; } = string.Empty;
    public virtual ICollection<UserRoleEntity>? UserRoles { get; set; }
    public virtual ICollection<BalanceEntity>? Balances { get; set; }
    public virtual ICollection<CategoryEntity>? Categories { get; set; }
}
