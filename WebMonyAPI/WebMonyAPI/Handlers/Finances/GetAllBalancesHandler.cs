using AutoMapper;
using MediatR;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Finances;
using WebMonyAPI.Services;

namespace WebMonyAPI.Handlers.Finances;

public class GetAllBalancesHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IMapper mapper,
    IIdentityService identityService)
    : IRequestHandler<GetAllBalancesQuery, IReadOnlyList<BalanceDto>>
{
    public async Task<IReadOnlyList<BalanceDto>> Handle(
        GetAllBalancesQuery request,
        CancellationToken cancellationToken)
    {

        var userId = await identityService.GetUserIdAsync();
        var spec = new BalanceWithCurrencySpecification(userId);

        var entities = await repo.ListAsync(spec);

        return mapper.Map<IReadOnlyList<BalanceDto>>(entities);
    }
}
