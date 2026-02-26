using MediatR;
using WebMonyAPI.Dtos.Finances;

namespace WebMonyAPI.Commands.Finances;

public record CreateBalanceCommand(CreateBalanceDto Model)
    : IRequest<BalanceDto>;
