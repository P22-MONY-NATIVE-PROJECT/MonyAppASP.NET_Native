using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebMonyAPI.Entities.Base;
using WebMonyAPI.Entities.Operations;

namespace WebMonyAPI.Entities.Finances;

/// <summary>
/// Показує баланс зберігання грошей (готівка, картка, копілка).
/// </summary>
/// <remarks>
/// Якщо IsSaving = false, то це звичайний баланс, з якого можна витрачати гроші. Якщо IsSaving = true, то це "скарбничка", куди можна додавати гроші, але не можна витрачати.
/// </remarks>

[Table("tbl_balances")]
public class BalanceEntity : BaseEntity<long>
{
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    public string? Icon { get; set; }

    [ForeignKey(nameof(Currency))]
    public long CurrencyId { get; set; }
    public CurrencyEntity? Currency { get; set; }

    // Кількість грошей на балансі
    public decimal Amount { get; set; }

    // Чи баланс для заощаджень? Якщо false, то ним можна користуватись для витрат. Якщо true, то це "скарбничка", куди можна додавати гроші, але не можна витрачати.
    public bool IsSaving { get; set; }
    public ICollection<OperationEntity>? Operations { get; set; }
}
