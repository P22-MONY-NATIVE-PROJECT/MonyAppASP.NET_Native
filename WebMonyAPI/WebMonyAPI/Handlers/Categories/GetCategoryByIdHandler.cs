using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Data;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Handlers.Categories.Saving;

public class GetCategoryByIdHandler(IGenericRepository<CategoryEntity, long> repo, IMapper mapper)
    : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
{
    public async Task<CategoryDto> Handle(
        GetCategoryByIdQuery request,
        CancellationToken cancellationToken)
    {
        var entity = await repo.GetByIdAsync(request.Id);

        return mapper.Map<CategoryDto>(entity);
    }
}
