using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class GetAllCategoryTypesHandler(IGenericRepository<CategoryTypeEntity, long> repo, IMapper mapper)
    : IRequestHandler<GetAllCategoryTypesQuery, IEnumerable<CategoryTypeDto>>
{
    public async Task<IEnumerable<CategoryTypeDto>> Handle(
        GetAllCategoryTypesQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repo.AsQurable()
            .Where(x=>x.IsDeleted!=true)
            .ToListAsync();
        return mapper.Map<IEnumerable<CategoryTypeDto>>(entities);
    }
}
