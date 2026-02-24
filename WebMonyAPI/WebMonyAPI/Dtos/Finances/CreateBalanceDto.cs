namespace WebMonyAPI.Dtos.Finances;

public class CreateBalanceDto
{
    public string Name { get; set; } = string.Empty;
    public IFormFile? Icon { get; set; }

    public long CurrencyId { get; set; }

    public decimal Amount { get; set; }
    public bool IsSaving { get; set; }
}
