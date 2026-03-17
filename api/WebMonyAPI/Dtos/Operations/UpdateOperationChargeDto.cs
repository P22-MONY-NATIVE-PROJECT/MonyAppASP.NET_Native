using WebMonyAPI.Entities.Operations;

namespace WebMonyAPI.Dtos.Operations;

public class UpdateOperationChargeDto
{
    public long Id { get; set; }
    public decimal Amount { get; set; } = 0;
    public decimal Percentage { get; set; } = 0;
    public ChargeApplicationType ApplicationType { get; set; } = ChargeApplicationType.Subtract;
    public ChargeType Type { get; set; }
}
