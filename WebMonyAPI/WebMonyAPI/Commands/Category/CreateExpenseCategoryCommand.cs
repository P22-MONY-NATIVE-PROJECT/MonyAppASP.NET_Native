using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Commands.Category;

public record CreateExpenseCategoryCommand(CreateExpenseCategoryDto Model)
    : IRequest<ExpenseCategoryDto>;
