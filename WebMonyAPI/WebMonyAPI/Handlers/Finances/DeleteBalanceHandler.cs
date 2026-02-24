using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class DeleteBalanceHandler(
    IGenericRepository<BalanceEntity, long> repo)
    : IRequestHandler<DeleteBalanceCommand, Unit>
{
    public async Task<Unit> Handle(
        DeleteBalanceCommand request,
        CancellationToken cancellationToken)
    {
        await repo.DeleteAsync(request.Id);
        return Unit.Value;
    }
}
