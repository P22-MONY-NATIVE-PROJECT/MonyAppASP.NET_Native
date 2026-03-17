using MediatR;
using WebMonyAPI.Dtos.Operations;

namespace WebMonyAPI.Commands.Operations;

public record CreateOperationCommand(CreateOperationDto Model) : IRequest<OperationDto>;
