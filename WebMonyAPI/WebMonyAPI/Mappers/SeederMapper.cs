using AutoMapper;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.SeedData.Models;

namespace WebMonyAPI.Mappers;

public class SeederMapper : Profile
{
    public SeederMapper()
    {
        CreateMap<SeederBaseCategoryModel, ExpenseCategoryEntity>();
        CreateMap<SeederBaseCategoryModel, IncomeCategoryEntity>();
        CreateMap<SeederBaseCategoryModel, SavingCategoryEntity>();
        CreateMap<SeederCurrencyModel, CurrencyEntity>();
    }
}
