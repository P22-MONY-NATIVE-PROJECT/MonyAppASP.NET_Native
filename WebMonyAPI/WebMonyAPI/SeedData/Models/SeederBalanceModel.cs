namespace WebMonyAPI.SeedData.Models;

public class SeederBalanceModel
{
    public string Name { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public bool IsSaving { get; set; }
    public string CurrencyCode { get; set; } = string.Empty;
    public long UserId { get; set; }
}
