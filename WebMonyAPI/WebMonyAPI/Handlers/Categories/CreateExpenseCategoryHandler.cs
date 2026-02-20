using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class CreateExpenseCategoryHandler(IGenericRepository<ExpenseCategoryEntity, long> repo, IMapper mapper, IImageService imageService)
    : IRequestHandler<CreateExpenseCategoryCommand, ExpenseCategoryDto>
{
    public async Task<ExpenseCategoryDto> Handle(
        CreateExpenseCategoryCommand request,
        CancellationToken cancellationToken)
    {
        Console.WriteLine($"request:{request}");
        var entity = new ExpenseCategoryEntity
        {
            Name = request.Model.Name
        };

        if (request.Model.Icon != null)
        {
            entity.Icon = await imageService
                .SaveImageAsync(request.Model.Icon);
        }

        await repo.AddAsync(entity);
        await repo.SaveChangesAsync();

        return mapper.Map<ExpenseCategoryDto>(entity);
    }
}
