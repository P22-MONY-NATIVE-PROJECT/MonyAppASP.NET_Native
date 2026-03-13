
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

    [HttpPost("forgot-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ForgotPassword([FromBody] AccountForgotPasswordDto model)
    {
        var command = new ForgotPasswordCommand(model);
        var result = await mediator.Send(command);
        if (result)
            return Ok();
        else
            return BadRequest(new
            {
                Status = 400,
                IsValid = false,
                Errors = new { Email = "Користувача з такою поштою не існує" }
            });
    }
}
