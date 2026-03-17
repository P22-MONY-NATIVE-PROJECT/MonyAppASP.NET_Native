using AutoMapper;
using MediatR;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Finances;
using WebMonyAPI.Services;

namespace WebMonyAPI.Handlers.Finances;

public class GetBalancesBySavingHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IMapper mapper,
    IIdentityService identityService)
    : IRequestHandler<GetBalancesBySavingQuery, IReadOnlyList<BalanceDto>>
{
    public async Task<IReadOnlyList<BalanceDto>> Handle(
        GetBalancesBySavingQuery request,
        CancellationToken cancellationToken)
    {
        var userId = await identityService.GetUserIdAsync();

        var spec = new BalanceWithCurrencySpecification(userId, request.IsSaving);
        var entities = await repo.ListAsync(spec);

        return mapper.Map<IReadOnlyList<BalanceDto>>(entities);
    }
}

