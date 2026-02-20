using MediatR;
using WebMonyAPI.Dtos.Users;
using WebMonyAPI.Queries.Users;
using WebMonyAPI.Services;

namespace WebMonyAPI.Handlers.Users;

public class UsersHandler : IRequestHandler<GetUsersQuery, IEnumerable<UserDto>>
{
    public async Task<IEnumerable<UserDto>> Handle(GetUsersQuery request, 
        CancellationToken cancellationToken)
    {
        var list = new List<UserDto>();
        list.Add(new UserDto
        {
            Id = Guid.NewGuid(),
            FirstName = "John",
            LastName = "Doe",
            Email = "ss@ss.ss",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        });
        list.Add(new UserDto
        {
            Id = Guid.NewGuid(),
            FirstName = "Jane",
            LastName = "Smith",
            Email = "gg@gg.gg",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        });
        return list;
    }
}
// public class UsersHandler : IRequestHandler<GetUsersQuery, IEnumerable<UserDto>>
// {
//     private readonly IUserService _userService;

//     public UsersHandler(IUserService userService)
//     {
//         _userService = userService;
//     }

//     public async Task<IEnumerable<UserDto>> Handle(
//         GetUsersQuery request,
//         CancellationToken cancellationToken)
//     {
//         return await _userService.GetAllAsync(
//             request.Search,
//             request.Page,
//             request.PageSize);
//     }
// }
