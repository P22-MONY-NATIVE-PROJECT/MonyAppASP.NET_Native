using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class GetCategoriesHandler(IGenericRepository<CategoryEntity, long> repo, IMapper mapper)
    : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
{
    public async Task<IEnumerable<CategoryDto>> Handle(
        GetCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repo.AsQurable()
            .Where(x=>x.CategoryTypeId==request.typeId)
            .ToListAsync();
        return mapper.Map<IEnumerable<CategoryDto>>(entities);
    }
}
