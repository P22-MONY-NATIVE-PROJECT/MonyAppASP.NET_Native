using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Entities.Finances;

[Table("tbl_currencies")]
public class CurrencyEntity : BaseEntity<long>
{
    // Долар, Євро, Гривня
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    // USD, EUR, UAH
    [StringLength(10)]
    public string Code { get; set; } = string.Empty;

    // $, €, ₴
    public char Symbol { get; set; }

    // Курс обміну до долара. € = 1.18, ₴ = 0.023
    public decimal DollarExchangeRate { get; set; }
}
