using MediatR;
using WebMonyAPI.Dtos.Categories;

namespace WebMonyAPI.Commands.Category;

public record DeleteCategoryCommand(long Id)
    : IRequest;
