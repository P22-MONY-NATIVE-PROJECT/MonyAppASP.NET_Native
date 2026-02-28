namespace WebMonyAPI.Dtos.Operations;

public class CreateOperationDto
{
    public string Comment { get; set; } = "";
    public decimal Amount { get; set; }
    public long CategoryId { get; set; }
    public long BalanceId { get; set; }
    public List<CreateOperationChargeDto> Charges { get; set; } = new();
}
