using MediatR;

namespace WebMonyAPI.Queries.Finances;

public record UserLowBalanceInfo(string Email, decimal TotalBalanceUsd);

public record GetLowBalanceUsersQuery(decimal Threshold) : IRequest<List<UserLowBalanceInfo>>;
