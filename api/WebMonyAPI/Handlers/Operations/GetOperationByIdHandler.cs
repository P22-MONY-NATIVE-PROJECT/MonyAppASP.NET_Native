using AutoMapper;
using MediatR;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Operations;
using WebMonyAPI.Services;

namespace WebMonyAPI.Handlers.Operations;

public class GetOperationByIdHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<BalanceEntity, long> balanceRepo,
    IMapper mapper,
    IIdentityService identityService
    )
    : IRequestHandler<GetOperationByIdQuery, OperationDto?>
{
    public async Task<OperationDto?> Handle(
        GetOperationByIdQuery request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();

        var balancesSpec = new BalanceWithCurrencySpecification(userId);
        var balances = await balanceRepo.ListAsync(balancesSpec);
        var balancesIds = balances.Select(b => b.Id).ToArray();

        var spec = new OperationWithDetailsSpecification(request.Id, balancesIds);

        var result = await repo.ListAsync(spec);
        var entity = result.FirstOrDefault();

        return entity == null
            ? null
            : mapper.Map<OperationDto>(entity);
    }
}
