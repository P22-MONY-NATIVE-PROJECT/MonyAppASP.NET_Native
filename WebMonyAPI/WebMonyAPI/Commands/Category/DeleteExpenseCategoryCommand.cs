using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Commands.Category;

public record DeleteExpenseCategoryCommand(long Id)
    : IRequest;
