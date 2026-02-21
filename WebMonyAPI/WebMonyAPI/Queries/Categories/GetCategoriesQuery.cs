using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Queries.Categories;

public record GetCategoriesQuery(long CategoryTypeId)
    : IRequest<IEnumerable<CategoryDto>>;
