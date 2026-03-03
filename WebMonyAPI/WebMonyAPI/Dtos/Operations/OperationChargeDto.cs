
namespace WebMonyAPI.Dtos.Operations;

public class OperationChargeDto
{
    public long Id { get; set; }
    public decimal? Amount { get; set; }
    public decimal? Percentage { get; set; }
    public string Type { get; set; } = string.Empty;
    public string ApplicationType { get; set; } = string.Empty;
}
