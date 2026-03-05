using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories.Saving;

public class DeleteCategoryHandler(IGenericRepository<CategoryEntity, 
    long> repo,
    IIdentityService identityService)
    : IRequestHandler<DeleteCategoryCommand>
{
    public async Task Handle(
        DeleteCategoryCommand request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();
        var entity = await repo.GetByIdAsync(request.Id);
        if (entity != null)
            throw new Exception("Category not found");

        await repo.DeleteAsync(request.Id);
    }
}
