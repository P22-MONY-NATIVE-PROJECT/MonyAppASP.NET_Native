using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;
using System.Linq.Expressions;

public class BalanceWithCurrencySpecification : ISpecification<BalanceEntity>
{
    public Expression<Func<BalanceEntity, bool>>? Criteria { get; }

    public List<Expression<Func<BalanceEntity, object>>> Includes { get; }
        = new();

    public BalanceWithCurrencySpecification()
    {
        Includes.Add(b => b.Currency!);
    }

    public BalanceWithCurrencySpecification(long id)
        : this()
    {
        Criteria = b => b.Id == id;
    }
}
