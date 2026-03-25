using MediatR;

namespace WebMonyAPI.Queries.Finances;

public record UserLowBalanceInfo(string Email, decimal TotalBalanceUsd, string? PushToken);

public record GetLowBalanceUsersQuery(decimal Threshold) : IRequest<List<UserLowBalanceInfo>>;
