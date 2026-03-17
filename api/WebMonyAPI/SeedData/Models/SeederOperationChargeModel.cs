using WebMonyAPI.Entities.Operations;

namespace WebMonyAPI.SeedData.Models;

public class SeederOperationChargeModel
{
    public decimal? Amount { get; set; }
    public decimal? Percentage { get; set; }
    public ChargeType Type { get; set; }
    public ChargeApplicationType ApplicationType { get; set; }
}
