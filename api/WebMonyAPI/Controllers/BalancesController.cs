using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Queries.Finances;
using Microsoft.AspNetCore.Authorization;

namespace WebMonyAPI.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class BalancesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        try
        {
            var result = await mediator.Send(new GetAllBalancesQuery());
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("by-saving")]
    public async Task<IActionResult> GetBySaving([FromQuery] bool isSaving)
    {
        try
        {
            var result = await mediator.Send(new GetBalancesBySavingQuery(isSaving));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id:long}")]
    public async Task<IActionResult> GetById(long id)
    {
        try
        {
            var result = await mediator.Send(new GetBalanceByIdQuery(id));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create([FromForm] CreateBalanceDto dto)
    {
        try
        {
            var result = await mediator.Send(new CreateBalanceCommand(dto));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update([FromForm] UpdateBalanceDto dto)
    {
        try
        {
            var result = await mediator.Send(new UpdateBalanceCommand(dto));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        try
        {
            await mediator.Send(new DeleteBalanceCommand(id));
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}