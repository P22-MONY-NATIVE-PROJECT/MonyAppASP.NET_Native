using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Queries.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class GetBalanceByIdHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IMapper mapper,
    IIdentityService identityService)
    : IRequestHandler<GetBalanceByIdQuery, BalanceDto?>
{
    public async Task<BalanceDto?> Handle(
        GetBalanceByIdQuery request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();
        var spec = new BalanceWithCurrencySpecification(request.Id, userId);

        var result = await repo.ListAsync(spec);
        var entity = result.FirstOrDefault();

        return entity == null
            ? null
            : mapper.Map<BalanceDto>(entity);
    }
}
