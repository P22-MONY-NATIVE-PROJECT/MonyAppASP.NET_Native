using MediatR;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Data;
using WebMonyAPI.Queries.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class GetLowBalanceUsersHandler(AppDbContext context)
    : IRequestHandler<GetLowBalanceUsersQuery, List<UserLowBalanceInfo>>
{
    public async Task<List<UserLowBalanceInfo>> Handle(GetLowBalanceUsersQuery request, CancellationToken cancellationToken)
    {
        var usersWithLowBalance = await context.Users
            .Where(u => !u.IsDeleted)
            .Select(u => new 
            {
                Email = u.Email ?? "Unknown",
                PushToken = u.PushToken,
                TotalBalanceUsd = u.Balances != null 
                    ? u.Balances.Sum(b => b.Amount * (b.Currency != null ? b.Currency.DollarExchangeRate : 0))
                    : 0
            })
            .Where(u => u.TotalBalanceUsd < request.Threshold)
            .Select(u => new UserLowBalanceInfo(u.Email, u.TotalBalanceUsd, u.PushToken))
            .ToListAsync(cancellationToken);

        return usersWithLowBalance;
    }
}
