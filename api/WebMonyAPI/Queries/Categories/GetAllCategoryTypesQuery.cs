using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Queries.Categories;

public record GetAllCategoryTypesQuery()
    : IRequest<IEnumerable<CategoryTypeDto>>;
