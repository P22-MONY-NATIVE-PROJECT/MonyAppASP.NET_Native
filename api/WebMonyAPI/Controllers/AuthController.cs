
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Commands.User;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IMediator mediator, IJWTTokenService tokenService) : ControllerBase
{
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        try
        {
            var command = new LoginCommand(dto);
            var result = await mediator.Send(command);

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost]
    [Route("register")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Register([FromForm] RegisterDto dto)
    {
        try {
            var command = new RegisterCommand(dto);
            var result = await mediator.Send(command);

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("google")]

    public async Task<IActionResult> Google([FromBody] GoogleLoginDto dto)
    {
        var command = new GoogleLoginCommand(dto);
        var result = await mediator.Send(command);
        if (string.IsNullOrWhiteSpace(result?.AccessToken))
            return BadRequest();

        return Ok(result);
    }

    [Authorize]
    [HttpPut("edit")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Edit([FromForm] EditUserDto dto)
    {
        var request = this.Request;
        var userId = User.FindFirstValue("id");
        if (userId == null) return Unauthorized();
 
        var command = new EditUserCommand(dto, userId);
        var result = await mediator.Send(command);
        return result == null ? BadRequest() : Ok(result);
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

    [HttpPost("reset-password")]
    [AllowAnonymous]
    public async Task<IActionResult> ResetPassword([FromBody] AccountResetPasswordDto model)
    {
        var command = new ResetPasswordCommand(model);
        var result = await mediator.Send(command);

        if (result)
            return Ok();

        return BadRequest(new
        {
            Status = 400,
            IsValid = false,
            Errors = new { Code = "Невірний або прострочений код відновлення паролю" }
        });
    }

    //[Authorize]
    //[HttpPost("push-token")]
    //public async Task<IActionResult> UpdatePushToken([FromBody] PushTokenDto dto)
    //{
    //    var command = new UpdatePushTokenCommand(dto.Token);
    //    var result = await mediator.Send(command);
    //    return result ? Ok() : BadRequest();
    //}
}
