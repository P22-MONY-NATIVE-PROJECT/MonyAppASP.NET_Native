using System.Linq.Expressions;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Dtos.Helpers;

public class OperationWithDetailsSpecification : ISpecification<OperationEntity>
{
    public Expression<Func<OperationEntity, bool>>? Criteria { get; }

    public List<Expression<Func<OperationEntity, object>>> Includes { get; } =  new();

    public OperationWithDetailsSpecification()
    {
        Includes.Add(x => x.Charges!);
        Includes.Add(x => x.Balance!);
        Includes.Add(x => x.Category!);
    }

    public OperationWithDetailsSpecification(long balanceId) : this()
    {
        Criteria = x => x.BalanceId == balanceId;
    }
}
