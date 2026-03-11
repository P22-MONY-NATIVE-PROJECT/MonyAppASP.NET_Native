using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class UpdateCategoryHandler(IGenericRepository<CategoryEntity, long> repo, 
    IMapper mapper, 
    IImageService imageService,
    IIdentityService identityService)
    : IRequestHandler<UpdateCategoryCommand, CategoryDto>
{
    public async Task<CategoryDto> Handle(
        UpdateCategoryCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await repo.GetByIdAsync(request.Model.Id);
        long userId = await identityService.GetUserIdAsync();

        if (entity == null || entity.IsDeleted || entity.UserId != userId)
            throw new KeyNotFoundException("Category not found");

        entity.Name = request.Model.Name;

        if (request.Model.Icon != null)
        {
            // Delete old file if exists
            if (!string.IsNullOrEmpty(entity.Icon))
                await imageService.DeleteImageAsync(entity.Icon);

            entity.Icon = await imageService
                .SaveImageAsync(request.Model.Icon);
        }

        await repo.UpdateAsync(entity);

        return mapper.Map<CategoryDto>(entity);
    }
}
