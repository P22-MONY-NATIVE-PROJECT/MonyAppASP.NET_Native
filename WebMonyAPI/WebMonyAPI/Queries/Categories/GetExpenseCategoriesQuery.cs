using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Queries.Categories;

public record GetExpenseCategoriesQuery()
    : IRequest<IEnumerable<ExpenseCategoryDto>>;
