using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Entities.Operations;

[Table("tbl_operations")]
public class OperationEntity : BaseEntity<long>
{
    public decimal Amount { get; set; }
    public string? Comment { get; set; }
    public long BalanceId { get; set; }
    public BalanceEntity? Balance { get; set; }
    public ICollection<OperationChargeEntity>? Charges { get; set; }
    public long CategoryId { get; set; }
    public CategoryEntity? Category { get; set; }
}
