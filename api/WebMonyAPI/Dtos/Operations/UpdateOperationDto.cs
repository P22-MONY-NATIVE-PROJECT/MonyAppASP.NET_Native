namespace WebMonyAPI.Dtos.Operations;

public class UpdateOperationDto
{
    public long Id { get; set; }
    public string Comment { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public long CategoryId { get; set; }
    public long BalanceId { get; set; }
    public List<UpdateOperationChargeDto> Charges { get; set; } = new();
}
