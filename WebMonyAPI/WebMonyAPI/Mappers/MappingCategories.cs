using AutoMapper;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Mappers;

public class MappingCategories : Profile
{
    public MappingCategories()
    {
        CreateMap<CategoryBaseEntity, CategoryDto>();
    }
}
