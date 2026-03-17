namespace WebMonyAPI.SeedData.Models;

public class SeederOperationModel
{
    public decimal InitAmount { get; set; }
    public decimal CalcAmount { get; set; }
    public long CategoryId { get; set; }
    public long BalanceId { get; set; }
    public string? Comment { get; set; } = "no comment";
    public List<SeederOperationChargeModel> Charges { get; set; } = new List<SeederOperationChargeModel>();
}
