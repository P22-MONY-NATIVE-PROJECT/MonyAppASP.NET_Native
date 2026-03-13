
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Commands.User;
using WebMonyAPI.Dtos.Auth;

namespace WebMonyAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var command = new LoginCommand(dto);
        var result = await mediator.Send(command);
        return result == string.Empty ? BadRequest() : Ok(new { token = result });
    }

    [HttpPost]
    [Route("register")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Register([FromForm] RegisterDto dto)
    {
        var command = new RegisterCommand(dto);
        var result = await mediator.Send(command);
        return result == string.Empty ? BadRequest() : Ok(new { token = result });
    }

    [Authorize]
    [HttpPut("edit")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Edit([FromForm] EditUserDto dto)
    {
        var userId = User.FindFirstValue("id");
        if (userId == null) return Unauthorized();
 
        var command = new EditUserCommand(dto, userId);
        var result = await mediator.Send(command);
        return result == string.Empty ? BadRequest() : Ok(new { token = result });
    }
}
