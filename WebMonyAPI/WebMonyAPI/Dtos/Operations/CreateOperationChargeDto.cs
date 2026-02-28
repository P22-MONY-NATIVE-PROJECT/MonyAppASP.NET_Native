using WebMonyAPI.Entities.Operations;

namespace WebMonyAPI.Dtos.Operations;

public class CreateOperationChargeDto
{
    public decimal Amount { get; set; } = 0;
    public decimal Percentage { get; set; } = 0;
    public ChargeApplicationType ApplicationType { get; set; } = ChargeApplicationType.Subtract;
    public ChargeType Tyep { get; set; }
}
