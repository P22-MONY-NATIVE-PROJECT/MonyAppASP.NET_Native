
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebMonyAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IMediator mediator) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var command = new LoginCommand(dto);
        var result = await mediator.Send(command);
        return result == string.Empty ? BadRequest() : Ok(new { token = result });
    }
}
