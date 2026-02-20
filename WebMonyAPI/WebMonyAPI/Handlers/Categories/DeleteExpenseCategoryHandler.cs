using MediatR;
using AutoMapper;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Handlers.Categories;

public class DeleteExpenseCategoryHandler
    : IRequestHandler<DeleteExpenseCategoryCommand>
{
    private readonly IGenericRepository<ExpenseCategoryEntity, long> repo;

    public DeleteExpenseCategoryHandler(
        IGenericRepository<ExpenseCategoryEntity, long> repo)
    {
        this.repo = repo;
    }

    public async Task Handle(
        DeleteExpenseCategoryCommand request,
        CancellationToken cancellationToken)
    {
        await repo.DeleteAsync(request.Id);
    }
}
