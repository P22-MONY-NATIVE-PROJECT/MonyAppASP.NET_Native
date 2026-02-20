using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Queries.Categories;

public record GetCategoryByIdQuery(long Id)
    : IRequest<CategoryDto?>;
