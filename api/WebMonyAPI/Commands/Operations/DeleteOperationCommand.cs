using MediatR;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Commands.Operations;

public record DeleteOperationCommand(long id) : IRequest<Unit>;
