using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class UpdateBalanceHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IMapper mapper,
    IImageService imageService,
    IIdentityService identityService)
    : IRequestHandler<UpdateBalanceCommand, BalanceDto>
{
    public async Task<BalanceDto> Handle(
        UpdateBalanceCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await repo.GetByIdAsync(request.Model.Id);
        long userId = await identityService.GetUserIdAsync();

        if (entity == null || entity.UserId != userId)
            throw new Exception("Balance not found");

        mapper.Map(request.Model, entity);
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
