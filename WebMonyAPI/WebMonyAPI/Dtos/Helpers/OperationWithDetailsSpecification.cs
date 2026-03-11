using System.Linq.Expressions;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Dtos.Helpers;

public class OperationWithDetailsSpecification : ISpecification<OperationEntity>
{
    public Expression<Func<OperationEntity, bool>>? Criteria { get; }

    public List<Expression<Func<OperationEntity, object>>> Includes { get; } =  new();

    public OperationWithDetailsSpecification(long[] balancesIds)
    {
        Includes.Add(x => x.Charges!);
        Includes.Add(x => x.Balance!);
        Includes.Add(x => x.Category!);
        Includes.Add(x => x.Category!.CategoryType!);
        Criteria = x => balancesIds.Contains(x.BalanceId);
    }

    public OperationWithDetailsSpecification(long id, long[] balancesIds) : this(balancesIds)
    {
        Criteria = x => x.Id == id;
    }
}
