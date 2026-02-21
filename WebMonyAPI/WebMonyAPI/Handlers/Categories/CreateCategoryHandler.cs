using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class CreateCategoryHandler(
    IGenericRepository<CategoryBaseEntity, long> repo,
    IMapper mapper,
    IImageService imageService)
    : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    public async Task<CategoryDto> Handle(
        CreateCategoryCommand request,
        CancellationToken cancellationToken)
    {
        var entity = new CategoryBaseEntity
        {
            Name = request.Model.Name,
            CategoryTypeId = request.CategoryTypeId
        };

        if (request.Model.Icon != null)
            entity.Icon = await imageService.SaveImageAsync(request.Model.Icon);

        await repo.AddAsync(entity);
        await repo.SaveChangesAsync();

        return mapper.Map<CategoryDto>(entity);
    }
}
