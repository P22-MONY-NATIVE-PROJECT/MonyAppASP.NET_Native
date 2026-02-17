using MediatR;
using WebMonyAPI.Dtos.Users;

namespace WebMonyAPI.Queries.Users;

public record GetUsersQuery(
    string? Search = null,
    int Page = 1,
    int PageSize = 10
) : IRequest<IEnumerable<UserDto>>;
