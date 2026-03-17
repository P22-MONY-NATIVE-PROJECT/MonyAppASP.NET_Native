using AutoMapper;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.SeedData.Models;

namespace WebMonyAPI.Mappers;

public class SeederMapper : Profile
{
    public SeederMapper()
    {
        CreateMap<SeederCurrencyModel, CurrencyEntity>();
        CreateMap<SeederBalanceModel, BalanceEntity>();
        CreateMap<SeederOperationChargeModel, OperationChargeEntity>();
        CreateMap<SeederOperationModel, OperationEntity>();
    }
}
