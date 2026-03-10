using AutoMapper;
using MediatR;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Operations;

namespace WebMonyAPI.Handlers.Operations;

public class GetAllOperationsHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<BalanceEntity, long> balanceRepo,
    IMapper mapper,
    IIdentityService identityService)
    : IRequestHandler<GetAllOperationsQuery, IReadOnlyList<OperationDto>>
{
    public async Task<IReadOnlyList<OperationDto>> Handle(
        GetAllOperationsQuery request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();

        var balancesSpec = new BalanceWithCurrencySpecification(userId);
        var balances = await balanceRepo.ListAsync(balancesSpec);
        var balancesIds = balances.Select(b => b.Id).ToArray();

        var spec = new OperationWithDetailsSpecification(balancesIds);

        var entities = await repo.ListAsync(spec);

        return mapper.Map<IReadOnlyList<OperationDto>>(entities);
    }
}