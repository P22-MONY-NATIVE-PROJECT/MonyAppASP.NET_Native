using MediatR;
using WebMonyAPI.Dtos.Finances;

namespace WebMonyAPI.Queries.Finances;

public record GetAllBalancesQuery()
    : IRequest<IReadOnlyList<BalanceDto>>;
