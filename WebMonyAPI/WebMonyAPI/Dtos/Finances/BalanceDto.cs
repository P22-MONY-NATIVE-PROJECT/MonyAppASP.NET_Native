namespace WebMonyAPI.Dtos.Finances;

public class BalanceDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Icon { get; set; }

    public long CurrencyId { get; set; }
    public string CurrencyName { get; set; } = string.Empty;
    public string CurrencyCode { get; set; } = string.Empty;
    public char CurrencySymbol { get; set; }

    public decimal Amount { get; set; }
    public bool IsSaving { get; set; }
}
