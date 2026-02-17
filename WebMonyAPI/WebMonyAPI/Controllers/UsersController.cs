
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebMonyAPI.Commands.User;
using WebMonyAPI.Dtos.Users;
using WebMonyAPI.Queries.Users;

namespace WebMonyAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetUsers([FromQuery] GetUserDto dto)
    {
        var query = new GetUsersQuery(dto.Search, dto.Page, dto.PageSize);
        var result = await mediator.Send(query);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var command = new LoginCommand(dto);
        var result = await mediator.Send(command);
        return result == string.Empty ? BadRequest() : Ok(new { token = result });
    }
}
