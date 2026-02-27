using AutoMapper;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Dtos.Categories;

public class MappingCategories : Profile
{
    public MappingCategories()
    {
        CreateMap<ExpenseCategoryEntity, CategoryDto>();
        CreateMap<SavingCategoryEntity, CategoryDto>();
        CreateMap<IncomeCategoryEntity, CategoryDto>();
        CreateMap<CategoryEntity, CategoryDto>();
        CreateMap<CategoryTypeEntity, CategoryTypeDto>();
    }
}
