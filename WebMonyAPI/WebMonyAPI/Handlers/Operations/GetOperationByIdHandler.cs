using AutoMapper;
using MediatR;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Operations;

namespace WebMonyAPI.Handlers.Operations;

public class GetOperationByIdHandler(
    IGenericRepository<OperationEntity, long> repo,
    IMapper mapper)
    : IRequestHandler<GetOperationByIdQuery, OperationDto?>
{
    public async Task<OperationDto?> Handle(
        GetOperationByIdQuery request,
        CancellationToken cancellationToken)
    {
        var spec = new OperationWithDetailsSpecification(request.Id);

        var result = await repo.ListAsync(spec);
        var entity = result.FirstOrDefault();

        return entity == null
            ? null
            : mapper.Map<OperationDto>(entity);
    }
}
