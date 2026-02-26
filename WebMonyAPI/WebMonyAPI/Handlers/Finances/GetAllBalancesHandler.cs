using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Queries.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class GetAllBalancesHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IMapper mapper)
    : IRequestHandler<GetAllBalancesQuery, IReadOnlyList<BalanceDto>>
{
    public async Task<IReadOnlyList<BalanceDto>> Handle(
        GetAllBalancesQuery request,
        CancellationToken cancellationToken)
    {
        var spec = new BalanceWithCurrencySpecification();

        var entities = await repo.ListAsync(spec);

        return mapper.Map<IReadOnlyList<BalanceDto>>(entities);
    }
}
