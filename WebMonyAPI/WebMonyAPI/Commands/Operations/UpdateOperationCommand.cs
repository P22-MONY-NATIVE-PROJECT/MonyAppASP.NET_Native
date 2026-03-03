using MediatR;
using WebMonyAPI.Dtos.Operations;

namespace WebMonyAPI.Commands.Operations;

public record UpdateOperationCommand(UpdateOperationDto Model) : IRequest<OperationDto>;

