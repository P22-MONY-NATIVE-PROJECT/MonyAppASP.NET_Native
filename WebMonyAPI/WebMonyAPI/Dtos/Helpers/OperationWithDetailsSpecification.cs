using System.Linq.Expressions;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Dtos.Helpers;

public class OperationWithDetailsSpecification : ISpecification<OperationEntity>
{
    public Expression<Func<OperationEntity, bool>>? Criteria { get; }

    public List<Expression<Func<OperationEntity, object>>> Includes { get; } =  new();

    public Expression<Func<OperationEntity, object>>? OrderBy { get; private set; }
    public Expression<Func<OperationEntity, object>>? OrderByDescending { get; private set; }

    public OperationWithDetailsSpecification(long[] balancesIds)
    {
        Includes.Add(x => x.Charges!);
        Includes.Add(x => x.Balance!);
        Includes.Add(x => x.Category!);
        Includes.Add(x => x.Category!.CategoryType!);
        OrderByDescending = x => x.DateCreated!;
        Criteria = x => balancesIds.Contains(x.BalanceId);
    }

    public OperationWithDetailsSpecification(long id, long[] balancesIds) : this(balancesIds)
    {
        Criteria = x => x.Id == id;
    }
}
