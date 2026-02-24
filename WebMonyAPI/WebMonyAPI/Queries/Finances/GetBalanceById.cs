using MediatR;
using WebMonyAPI.Dtos.Finances;

namespace WebMonyAPI.Queries.Finances;

public record GetBalanceByIdQuery(long Id)
    : IRequest<BalanceDto?>;
