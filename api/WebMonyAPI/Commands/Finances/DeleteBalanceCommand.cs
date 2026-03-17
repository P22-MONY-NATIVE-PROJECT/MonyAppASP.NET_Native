using MediatR;

namespace WebMonyAPI.Commands.Finances;

public record DeleteBalanceCommand(long Id)
    : IRequest<Unit>;
