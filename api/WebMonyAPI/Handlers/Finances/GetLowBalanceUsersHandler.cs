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
                UserId = u.Id,
                Email = u.Email ?? "Unknown",
                TotalBalanceUsd = u.Balances != null 
                    ? u.Balances
                    .Where(b => !b.IsDeleted)
                    .Sum(b => b.Amount * (b.Currency != null ? b.Currency.DollarExchangeRate : 0))
                    : 0
            })
            .Where(u => u.TotalBalanceUsd < request.Threshold)
            .Select(u => new UserLowBalanceInfo(u.UserId, u.Email, u.TotalBalanceUsd))
            .ToListAsync(cancellationToken);

        return usersWithLowBalance;
    }
}
