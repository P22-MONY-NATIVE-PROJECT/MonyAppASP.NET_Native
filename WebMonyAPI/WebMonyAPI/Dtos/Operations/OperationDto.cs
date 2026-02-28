
namespace WebMonyAPI.Dtos.Operations;

public class OperationDto
{
    public long Id { get; set; }
    public decimal Amount { get; set; }
    public string? Comment { get; set; }
    public long BalanceId { get; set; }
    public long CategoryId { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string BalanceName { get; set; } = string.Empty;
    public DateTime DateCreated { get; set; }
    public List<OperationChargeDto>? Charges { get; set; }
}
