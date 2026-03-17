using System.ComponentModel.DataAnnotations.Schema;

namespace WebMonyAPI.Entities.Identity;

[Table("tbl_refresh_tokens")]
public class RefreshTokenEntity
{
    public long Id { get; set; }
    public string Token { get; set; } = string.Empty;
    public long UserId { get; set; }
    public DateTime ExpiresAt { get; set; }
    public bool IsRevoked { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
