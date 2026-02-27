using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Queries.Finances;

namespace WebMonyAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BalancesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
        => Ok(await mediator.Send(new GetAllBalancesQuery()));

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById(long id)
        => Ok(await mediator.Send(new GetBalanceByIdQuery(id)));

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create(
        [FromForm] CreateBalanceDto dto)
        => Ok(await mediator.Send(new CreateBalanceCommand(dto)));

    [HttpPut]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update(
        [FromForm] UpdateBalanceDto dto)
        => Ok(await mediator.Send(new UpdateBalanceCommand(dto)));

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await mediator.Send(new DeleteBalanceCommand(id));
        return NoContent();
    }
}
