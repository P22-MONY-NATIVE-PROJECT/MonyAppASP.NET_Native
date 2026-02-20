using AutoMapper;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Dtos.Categories;

public class MappingCategories : Profile
{
    public MappingCategories()
    {
        CreateMap<ExpenseCategoryEntity, ExpenseCategoryDto>();
        CreateMap<SavingCategoryEntity, CreateExpenseCategoryDto>();
        CreateMap<IncomeCategoryEntity, UpdateExpenseCategoryDto>();
    }
}
