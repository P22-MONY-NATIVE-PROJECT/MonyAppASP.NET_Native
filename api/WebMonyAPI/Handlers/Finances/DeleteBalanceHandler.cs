using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class DeleteBalanceHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IIdentityService identityService)
    : IRequestHandler<DeleteBalanceCommand, Unit>
{
    public async Task<Unit> Handle(
        DeleteBalanceCommand request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();
        var entity = await repo.GetByIdAsync(request.Id);

        if (entity == null || entity.UserId != userId)
            throw new Exception("Balance not found");

        await repo.DeleteAsync(request.Id);
        return Unit.Value;
    }
}
