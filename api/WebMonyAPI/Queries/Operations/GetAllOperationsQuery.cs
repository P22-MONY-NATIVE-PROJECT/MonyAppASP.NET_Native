using MediatR;
using WebMonyAPI.Dtos.Operations;

namespace WebMonyAPI.Queries.Operations;

public record GetAllOperationsQuery()
    : IRequest<IReadOnlyList<OperationDto>>;
