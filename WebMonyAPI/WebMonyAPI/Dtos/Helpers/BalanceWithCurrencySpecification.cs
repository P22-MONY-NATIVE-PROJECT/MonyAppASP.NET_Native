using System.Linq.Expressions;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Interfaces;

public class BalanceWithCurrencySpecification : ISpecification<BalanceEntity>
{
    public Expression<Func<BalanceEntity, bool>>? Criteria { get; }

    public List<Expression<Func<BalanceEntity, object>>> Includes { get; }
        = new();

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
}