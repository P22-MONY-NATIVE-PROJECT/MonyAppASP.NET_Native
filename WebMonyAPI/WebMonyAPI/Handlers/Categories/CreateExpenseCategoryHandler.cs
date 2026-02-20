using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class CreateExpenseCategoryHandler
    : IRequestHandler<CreateExpenseCategoryCommand, ExpenseCategoryDto>
{
    private readonly IGenericRepository<ExpenseCategoryEntity, long> repo;
    private readonly IMapper mapper;

    public CreateExpenseCategoryHandler(
        IGenericRepository<ExpenseCategoryEntity, long> repo,
        IMapper mapper)
    {
        this.repo = repo;
        this.mapper = mapper;
    }

    public async Task<ExpenseCategoryDto> Handle(
        CreateExpenseCategoryCommand request,
        CancellationToken cancellationToken)
    {
        var entity = mapper.Map<ExpenseCategoryEntity>(request.Model);

        await repo.AddAsync(entity);
        await repo.SaveChangesAsync();

        return mapper.Map<ExpenseCategoryDto>(entity);
    }
}
