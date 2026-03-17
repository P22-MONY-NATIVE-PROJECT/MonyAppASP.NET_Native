using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Queries.Categories;

public record GetCategoriesQuery(long typeId)
    : IRequest<IEnumerable<CategoryDto>>;
