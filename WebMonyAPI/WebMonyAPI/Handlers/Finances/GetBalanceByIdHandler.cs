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
        var entity = await repo.GetByIdAsync(request.Id);

        return entity == null
            ? null
            : mapper.Map<BalanceDto>(entity);
    }
}
