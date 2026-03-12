using System.Linq.Expressions;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

public class BalanceWithCurrencySpecification : ISpecification<BalanceEntity>
{
    public Expression<Func<BalanceEntity, bool>>? Criteria { get; }

    public List<Expression<Func<BalanceEntity, object>>> Includes { get; }
        = new();

    public Expression<Func<BalanceEntity, object>>? OrderBy { get; private set; }
    public Expression<Func<BalanceEntity, object>>? OrderByDescending { get; private set; }

    public BalanceWithCurrencySpecification(long userId)
    {
        Includes.Add(b => b.Currency!);
        Criteria = b => b.UserId == userId;
    }

    public BalanceWithCurrencySpecification(long id, long userId)
        : this(userId)
    {
        Criteria = b => b.Id == id && b.UserId == userId;
    }

    public BalanceWithCurrencySpecification(long userId, bool isSaving)
    {
        Includes.Add(b => b.Currency!);
        Criteria = b => b.UserId == userId && b.IsSaving == isSaving;
    }
}