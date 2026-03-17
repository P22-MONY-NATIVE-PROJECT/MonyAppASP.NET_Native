using MediatR;
using WebMonyAPI.Dtos.Finances;

namespace WebMonyAPI.Queries.Finances;

public record GetBalancesBySavingQuery(bool IsSaving)
    : IRequest<IReadOnlyList<BalanceDto>>;

