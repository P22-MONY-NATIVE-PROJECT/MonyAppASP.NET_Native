namespace WebMonyAPI.Dtos.Finances;

public class CurrencyDto
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Code { get; set; } = string.Empty;
    public char Symbol { get; set; }
    public decimal DollarExchangeRate { get; set; }
}
