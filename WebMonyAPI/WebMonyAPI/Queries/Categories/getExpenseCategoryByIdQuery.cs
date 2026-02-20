using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Queries.Categories;

public record GetExpenseCategoryByIdQuery(long Id)
    : IRequest<ExpenseCategoryDto?>;
