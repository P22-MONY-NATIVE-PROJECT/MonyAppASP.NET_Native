using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Queries.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class GetExpenseCategoriesHandler
    : IRequestHandler<GetExpenseCategoriesQuery, IEnumerable<ExpenseCategoryDto>>
{
    private readonly IGenericRepository<ExpenseCategoryEntity, long> repo;
    private readonly IMapper mapper;

    public GetExpenseCategoriesHandler(
        IGenericRepository<ExpenseCategoryEntity, long> repo,
        IMapper mapper)
    {
        this.repo = repo;
        this.mapper = mapper;
    }

    public async Task<IEnumerable<ExpenseCategoryDto>> Handle(
        GetExpenseCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repo.ListAllAsync();
        return mapper.Map<IEnumerable<ExpenseCategoryDto>>(entities);
    }
}
