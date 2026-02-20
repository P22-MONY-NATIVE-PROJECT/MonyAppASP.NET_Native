using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Queries.Categories;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class GetExpenseCategoriesHandler(IGenericRepository<ExpenseCategoryEntity, long> repo, IMapper mapper)
    : IRequestHandler<GetExpenseCategoriesQuery, IEnumerable<ExpenseCategoryDto>>
{
    public async Task<IEnumerable<ExpenseCategoryDto>> Handle(
        GetExpenseCategoriesQuery request,
        CancellationToken cancellationToken)
    {
        var entities = await repo.ListAllAsync();
        return mapper.Map<IEnumerable<ExpenseCategoryDto>>(entities);
    }
}
