using WebMonyAPI.Entities.Base;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Entities.Operations;

public abstract class BaseOperationEntity : BaseEntity<long>
{
    public decimal Amount { get; set; }
    public string? Comment { get; set; }
    public long BalanceId { get; set; }
    public BalanceEntity? Balance { get; set; }
    public ICollection<OperationChargeEntity>? Charges { get; set; }
}
