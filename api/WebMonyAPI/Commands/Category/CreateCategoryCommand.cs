using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Commands.Category;

public record CreateCategoryCommand(CreateCategoryDto Model)
    : IRequest<CategoryDto>;
