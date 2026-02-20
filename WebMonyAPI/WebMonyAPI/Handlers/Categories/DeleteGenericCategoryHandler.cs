// using MediatR;
// using AutoMapper;
// using WebMonyAPI.Dtos.Categories;
// using WebMonyAPI.Commands.Category;
// using WebMonyAPI.Interfaces;
// using WebMonyAPI.Entities.Categories;

// namespace WebMonyAPI.Handlers.Categories;

// public class DeleteGenericCategoryHandler<CE>(IGenericRepository<CE, long> repo)
//     : IRequestHandler<DeleteGenericCategoryCommand<CE>>
//     where CE : class
// {
//     public async Task Handle(
//         DeleteGenericCategoryCommand<CE> request,
//         CancellationToken cancellationToken)
//     {
//         await repo.DeleteAsync(request.Id);
//     }
// }
