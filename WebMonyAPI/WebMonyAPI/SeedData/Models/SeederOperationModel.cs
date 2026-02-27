namespace WebMonyAPI.SeedData.Models;

public class SeederOperationModel
{
    public decimal Amount { get; set; }
    public long CategoryId { get; set; }
    public long BalanceId { get; set; }
    public string? Comment { get; set; } = "no comment";
    public List<SeederOperationChargeModel> Charges { get; set; } = new List<SeederOperationChargeModel>();
}
