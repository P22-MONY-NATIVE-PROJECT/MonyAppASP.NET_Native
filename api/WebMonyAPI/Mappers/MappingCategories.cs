using AutoMapper;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Dtos.Categories;

public class MappingCategories : Profile
{
    public MappingCategories()
    {
        CreateMap<CategoryEntity, CategoryDto>();
        CreateMap<CategoryTypeEntity, CategoryTypeDto>();
    }
}
