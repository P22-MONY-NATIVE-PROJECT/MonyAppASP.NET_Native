using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Queries.Categories;

public record GetCategoriesQuery()
    : IRequest<IEnumerable<CategoryDto>>;
