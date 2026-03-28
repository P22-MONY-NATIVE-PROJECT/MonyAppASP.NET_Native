using MediatR;
using Quartz;
using WebMonyAPI.Queries.Finances;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Infrastructure.Jobs;

public class CheckLowBalanceJob(IMediator mediator, IPushNotificationService pushNotificationService) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        var lowBalanceUsers = await mediator.Send(new GetLowBalanceUsersQuery(200));

        foreach (var user in lowBalanceUsers)
        {
            await pushNotificationService.SendToUserAsync(
                user.UserId,
                "Низький баланс",
                $"У вас загальний баланс < 200$ ({user.TotalBalanceUsd:F2}$)"
            );
        }
    }
}
