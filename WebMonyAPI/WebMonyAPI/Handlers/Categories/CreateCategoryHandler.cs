using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class CreateCategoryHandler(IGenericRepository<CategoryEntity, long> repo, IGenericRepository<CategoryTypeEntity, long> categoryRepo, IMapper mapper, IImageService imageService)
    : IRequestHandler<CreateCategoryCommand, CategoryDto>
{
    public async Task<CategoryDto> Handle(
        CreateCategoryCommand request,
        CancellationToken cancellationToken)
    {
        Console.WriteLine($"request:{request}");
        var entity = new CategoryEntity
        {
            Name = request.Model.Name,
        };
        var categoryType = await categoryRepo
            .GetByIdAsync(request.Model.CategoryTypeId);

        if (categoryType == null)
            throw new Exception("CategoryType not found");

        entity.CategoryType = categoryType;

        if (request.Model.Icon != null)
        {
            entity.Icon = await imageService
                .SaveImageAsync(request.Model.Icon);
        }

        await repo.AddAsync(entity);
        await repo.SaveChangesAsync();

        return mapper.Map<CategoryDto>(entity);
    }
}
