using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Commands.Category;

public record CreateCategoryCommand(CreateCategoryDto Model, long CategoryTypeId)
    : IRequest<CategoryDto>;
