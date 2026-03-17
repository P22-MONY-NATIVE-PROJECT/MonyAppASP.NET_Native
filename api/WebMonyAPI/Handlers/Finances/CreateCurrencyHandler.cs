using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Handlers.Finances;

public class CreateCurrencyHandler(
    IGenericRepository<CurrencyEntity, long> repo,
    IMapper mapper)
    : IRequestHandler<CreateCurrencyCommand, CurrencyDto>
{
    public async Task<CurrencyDto> Handle(
        CreateCurrencyCommand request,
        CancellationToken cancellationToken)
    {
        var entity = new CurrencyEntity
        {
            Name = request.Name,
            Code = request.Code,
            Symbol = request.Symbol,
            DollarExchangeRate = request.DollarExchangeRate
        };

        await repo.AddAsync(entity);
        await repo.SaveChangesAsync();

        return mapper.Map<CurrencyDto>(entity);
    }
}
