using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class DeleteExpenseCategoryHandler(IGenericRepository<ExpenseCategoryEntity, long> repo)
    : IRequestHandler<DeleteExpenseCategoryCommand>
{
    public async Task Handle(
        DeleteExpenseCategoryCommand request,
        CancellationToken cancellationToken)
    {
        await repo.DeleteAsync(request.Id);
    }
}
