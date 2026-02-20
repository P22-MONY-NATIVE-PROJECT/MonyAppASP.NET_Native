using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Controllers;

[ApiController]
[Route("api/expense-categories")]
public class ExpenseCategoriesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok(await mediator.Send(new GetExpenseCategoriesQuery()));

    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
        => Ok(await mediator.Send(new GetExpenseCategoryByIdQuery(id)));

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create(
        [FromForm] CreateExpenseCategoryDto dto)
    {
        return Ok(await mediator
            .Send(new CreateExpenseCategoryCommand(dto)));
    }

    [HttpPut]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update(
        [FromForm] UpdateExpenseCategoryDto dto)
    {
        return Ok(await mediator
            .Send(new UpdateExpenseCategoryCommand(dto)));
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await mediator.Send(new DeleteExpenseCategoryCommand(id));
        return Ok();
    }
}
