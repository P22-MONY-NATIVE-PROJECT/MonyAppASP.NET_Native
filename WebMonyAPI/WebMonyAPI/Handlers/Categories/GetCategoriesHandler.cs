using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Queries.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class GetCategoriesHandler(
    IGenericRepository<CategoryBaseEntity, long> repo,
    IMapper mapper)
    : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
{
    public async Task<IEnumerable<CategoryDto>> Handle(
        GetCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var spec = new Specification<CategoryBaseEntity>(e => e.CategoryTypeId == request.CategoryTypeId);
        var entities = await repo.ListAsync(spec);
        return mapper.Map<IEnumerable<CategoryDto>>(entities);
    }
}
