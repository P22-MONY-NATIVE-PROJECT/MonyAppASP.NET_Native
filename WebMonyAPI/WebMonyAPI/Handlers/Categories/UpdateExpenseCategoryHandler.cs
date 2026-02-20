using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class UpdateExpenseCategoryHandler
    : IRequestHandler<UpdateExpenseCategoryCommand, ExpenseCategoryDto>
{
    private readonly IGenericRepository<ExpenseCategoryEntity, long> repo;
    private readonly IMapper mapper;

    public UpdateExpenseCategoryHandler(
        IGenericRepository<ExpenseCategoryEntity, long> repo,
        IMapper mapper)
    {
        this.repo = repo;
        this.mapper = mapper;
    }

    public async Task<ExpenseCategoryDto> Handle(
        UpdateExpenseCategoryCommand request,
        CancellationToken cancellationToken)
    {
        var entity = await repo.GetByIdAsync(request.Model.Id);

        if (entity == null || entity.IsDeleted)
            throw new KeyNotFoundException("Category not found");

        mapper.Map(request.Model, entity);

        await repo.UpdateAsync(entity);

        return mapper.Map<ExpenseCategoryDto>(entity);
    }
}
