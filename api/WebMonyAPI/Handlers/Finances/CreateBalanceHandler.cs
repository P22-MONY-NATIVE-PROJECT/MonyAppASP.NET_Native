using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class CreateBalanceHandler(
    IGenericRepository<BalanceEntity, long> repo,
    IGenericRepository<CurrencyEntity, long> currencyRepo,
    IMapper mapper,
    IImageService imageService,
    IIdentityService identityService)
    : IRequestHandler<CreateBalanceCommand, BalanceDto>
{
    public async Task<BalanceDto> Handle(
        CreateBalanceCommand request,
        CancellationToken cancellationToken)
    {
        var currency = await currencyRepo
            .GetByIdAsync(request.Model.CurrencyId);

        if (currency == null)
            throw new Exception("Currency not found");

        var entity = mapper.Map<BalanceEntity>(request.Model);

        entity.CurrencyId = currency.Id;
        entity.UserId = await identityService.GetUserIdAsync();

        if (request.Model.Icon != null)
        {
            entity.Icon = await imageService
                .SaveImageAsync(request.Model.Icon);
        }

        await repo.AddAsync(entity);
        await repo.SaveChangesAsync();

        entity.Currency = currency;

        return mapper.Map<BalanceDto>(entity);
    }
}
