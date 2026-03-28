using MediatR;

namespace WebMonyAPI.Queries.Finances;

public record UserLowBalanceInfo(long UserId, string Email, decimal TotalBalanceUsd);

public record GetLowBalanceUsersQuery(decimal Threshold) : IRequest<List<UserLowBalanceInfo>>;
