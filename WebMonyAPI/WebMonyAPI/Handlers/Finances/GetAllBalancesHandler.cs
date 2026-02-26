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
        var entities = await repo.ListAllAsync();
        return mapper.Map<IReadOnlyList<BalanceDto>>(entities);
    }
}
