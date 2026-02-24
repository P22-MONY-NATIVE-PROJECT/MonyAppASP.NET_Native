using MediatR;
using WebMonyAPI.Dtos.Finances;

namespace WebMonyAPI.Commands.Finances;

public record UpdateBalanceCommand(UpdateBalanceDto Model)
    : IRequest<BalanceDto>;
