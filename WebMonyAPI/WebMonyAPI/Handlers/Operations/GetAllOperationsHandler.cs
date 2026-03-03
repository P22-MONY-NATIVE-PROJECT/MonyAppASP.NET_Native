using AutoMapper;
using MediatR;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Operations;

namespace WebMonyAPI.Handlers.Operations;

public class GetAllOperationsHandler(
    IGenericRepository<OperationEntity, long> repo,
    IMapper mapper)
    : IRequestHandler<GetAllOperationsQuery, IReadOnlyList<OperationDto>>
{
    public async Task<IReadOnlyList<OperationDto>> Handle(
        GetAllOperationsQuery request,
        CancellationToken cancellationToken)
    {
        var spec = new OperationWithDetailsSpecification();

        var entities = await repo.ListAsync(spec);

        return mapper.Map<IReadOnlyList<OperationDto>>(entities);
    }
}
