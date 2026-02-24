using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class UpdateBalanceHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IGenericRepository<CurrencyEntity, long> currencyRepo,
    IMapper mapper,
    IImageService imageService)
    : IRequestHandler<UpdateBalanceCommand, BalanceDto>
{
    public async Task<BalanceDto> Handle(
        UpdateBalanceCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await repo.GetByIdAsync(request.Model.Id);

        if (entity == null)
            throw new Exception("Balance not found");

        entity.Name = request.Model.Name;
        entity.Amount = request.Model.Amount;
        entity.IsSaving = request.Model.IsSaving;
        entity.CurrencyId = request.Model.CurrencyId;

        if (request.Model.Icon != null)
        {
            entity.Icon = await imageService
                .SaveImageAsync(request.Model.Icon);
        }

        await repo.UpdateAsync(entity);

        return mapper.Map<BalanceDto>(entity);
    }
}
