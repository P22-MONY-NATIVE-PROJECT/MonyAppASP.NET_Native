using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Commands.Category;

public record UpdateExpenseCategoryCommand(UpdateExpenseCategoryDto Model)
    : IRequest<ExpenseCategoryDto>;
