
using MediatR;
using Microsoft.AspNetCore.Mvc;
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
        var command = new LoginCommand(dto);
        var result = await mediator.Send(command);
        if (string.IsNullOrWhiteSpace(result?.AccessToken))
            return BadRequest();

        return Ok(new { accessToken = result.AccessToken, refreshToken = result.RefreshToken });
    }

    [HttpPost]
    [Route("register")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Register([FromForm] RegisterDto dto)
    {
        var command = new RegisterCommand(dto);
        var result = await mediator.Send(command);
        if (string.IsNullOrWhiteSpace(result?.AccessToken))
            return BadRequest();

        return Ok(new { accessToken = result.AccessToken, refreshToken = result.RefreshToken });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh([FromBody] RefreshRequestDto dto)
    {
        var result = await tokenService.RefreshTokenAsync(dto.RefreshToken);
        if (result == null || string.IsNullOrWhiteSpace(result.AccessToken))
            return BadRequest();

        return Ok(new { accessToken = result.AccessToken, refreshToken = result.RefreshToken });
    }

    [HttpPost("google")]
    public async Task<IActionResult> Google([FromBody] GoogleLoginDto dto)
    {
        var command = new GoogleLoginCommand(dto);
        var result = await mediator.Send(command);
        if (string.IsNullOrWhiteSpace(result?.AccessToken))
            return BadRequest();

        return Ok(new { accessToken = result.AccessToken, refreshToken = result.RefreshToken });
    }
}
