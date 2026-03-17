using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Data;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Handlers.Categories.Saving;

public class GetCategoryByIdHandler(IGenericRepository<CategoryEntity, long> repo, 
    IMapper mapper,
    IIdentityService identityService)
    : IRequestHandler<GetCategoryByIdQuery, CategoryDto>
{
    public async Task<CategoryDto> Handle(
        GetCategoryByIdQuery request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();

        var entity = await repo.GetByIdAsync(request.id);

        if (entity == null || entity.UserId != userId)
            throw new Exception("Unauthorized access to category.");

        return mapper.Map<CategoryDto>(entity);
    }
}
