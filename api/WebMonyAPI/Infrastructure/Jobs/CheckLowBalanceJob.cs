using MediatR;
using Quartz;
using WebMonyAPI.Queries.Finances;

namespace WebMonyAPI.Infrastructure.Jobs;

public class CheckLowBalanceJob(IMediator mediator) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        var lowBalanceUsers = await mediator.Send(new GetLowBalanceUsersQuery(200));

        foreach (var user in lowBalanceUsers)
        {
            Console.WriteLine($"Потрібно сповістити {user.Email}, бо в нього такий то баланс: {user.TotalBalanceUsd:F2}$");
        }
    }
}
