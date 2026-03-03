using MediatR;
using WebMonyAPI.Dtos.Operations;

namespace WebMonyAPI.Queries.Operations;

public record GetOperationByIdQuery(long Id)
    : IRequest<OperationDto?>;

