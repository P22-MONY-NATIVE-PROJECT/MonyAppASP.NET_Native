using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Queries.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class GetBalanceByIdHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IMapper mapper)
    : IRequestHandler<GetBalanceByIdQuery, BalanceDto?>
{
    public async Task<BalanceDto?> Handle(
        GetBalanceByIdQuery request,
        CancellationToken cancellationToken)
    {
        var spec = new BalanceWithCurrencySpecification(request.Id);

        var result = await repo.ListAsync(spec);
        var entity = result.FirstOrDefault();

        return entity == null
            ? null
            : mapper.Map<BalanceDto>(entity);
    }
}
