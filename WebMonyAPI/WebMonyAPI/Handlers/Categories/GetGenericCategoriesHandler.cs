// using MediatR;
// using AutoMapper;
// using WebMonyAPI.Dtos.Categories;
// using WebMonyAPI.Queries.Categories;
// using WebMonyAPI.Interfaces;
// using WebMonyAPI.Entities.Categories;

// namespace WebMonyAPI.Handlers.Categories;

// public class GetGenericCategoriesHandler<CE>(IGenericRepository<CE, long> repo, IMapper mapper)
//     : IRequestHandler<GetCategoriesQuery, IEnumerable<CategoryDto>>
// {
//     public async Task<IEnumerable<CategoryDto>> Handle(
//         GetCategoriesQuery request,
//         CancellationToken cancellationToken)
//     {
//         var entities = await repo.ListAllAsync();
//         return mapper.Map<IEnumerable<CategoryDto>>(entities);
//     }
// }
