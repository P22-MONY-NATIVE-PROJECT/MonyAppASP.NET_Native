using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Queries.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class GetCategoryByIdHandler(
    IGenericRepository<CategoryBaseEntity, long> repo,
    IMapper mapper)
    : IRequestHandler<GetCategoryByIdQuery, CategoryDto?>
{
    public async Task<CategoryDto?> Handle(
        GetCategoryByIdQuery request,
        CancellationToken cancellationToken)
    {
        var entity = await repo.GetByIdAsync(request.Id);
        return entity == null || entity.IsDeleted ? null : mapper.Map<CategoryDto>(entity);
    }
}
