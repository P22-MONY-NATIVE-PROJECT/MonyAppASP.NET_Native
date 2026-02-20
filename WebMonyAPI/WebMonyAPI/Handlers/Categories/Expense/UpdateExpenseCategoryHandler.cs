using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories.Expense;

public class UpdateExpenseCategoryHandler(IGenericRepository<ExpenseCategoryEntity, long> repo, IMapper mapper, IImageService imageService)
    : IRequestHandler<UpdateCategoryCommand, CategoryDto>
{
    public async Task<CategoryDto> Handle(
        UpdateCategoryCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await repo.GetByIdAsync(request.Model.Id);

        if (entity == null || entity.IsDeleted)
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
