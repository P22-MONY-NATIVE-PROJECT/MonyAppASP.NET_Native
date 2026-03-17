using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Commands.Category;

public record UpdateCategoryCommand(UpdateCategoryDto Model)
    : IRequest<CategoryDto>;
