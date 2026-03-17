namespace WebMonyAPI.SeedData.Models;

public class SeederCurrencyModel
{
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public char Symbol { get; set; }
    public decimal DollarExchangeRate { get; set; }
}
