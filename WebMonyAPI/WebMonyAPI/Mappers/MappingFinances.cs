using AutoMapper;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Dtos.Finances;

public class MappingFinances : Profile
{
    public MappingFinances()
    {
        CreateMap<BalanceEntity, BalanceDto>();
        CreateMap<CurrencyEntity, CurrencyDto>();
    }
}

