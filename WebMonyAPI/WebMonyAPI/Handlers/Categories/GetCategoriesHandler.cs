using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class GetCategoriesHandler(IGenericRepository<CategoryEntity, long> repo, 
    IMapper mapper,
    IIdentityService identityService)
    : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
{
    public async Task<IEnumerable<CategoryDto>> Handle(
        GetCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();

        var entities = await repo.AsQurable()
            .Where(x=>x.CategoryTypeId==request.typeId && x.UserId == userId)
            .ToListAsync();
        return mapper.Map<IEnumerable<CategoryDto>>(entities);
    }
}
