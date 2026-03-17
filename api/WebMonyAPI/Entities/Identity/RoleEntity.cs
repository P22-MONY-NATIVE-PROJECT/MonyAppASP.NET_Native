using Microsoft.AspNetCore.Identity;

namespace WebMonyAPI.Entities.Identity;

public class RoleEntity : IdentityRole<long>
{
    public virtual ICollection<UserRoleEntity>? UserRoles { get; set; } = new List<UserRoleEntity>();
    public RoleEntity() : base() { }

    public RoleEntity(string roleName) : base(roleName) { }
}
