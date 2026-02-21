using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Operations;

public enum ChargeType
{
    Tax = 1,
    Commission = 2
}

public enum ChargeApplicationType
{
    Add = 1,
    Substract = 2,
    Included = 3
}
public class OperationChargeEntity
{
    public decimal? Percentage { get; set; }
    public decimal? Amount { get; set; }
    public ChargeType Type { get; set; }
    public ChargeApplicationType ApplicationType { get; set; }
}
