using MediatR;
using Microsoft.AspNetCore.Mvc;
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

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(long id)
        => Ok(await mediator.Send(new GetExpenseCategoryByIdQuery(id)));

    [HttpPost]
    public async Task<IActionResult> Create(CreateExpenseCategoryDto dto)
        => Ok(await mediator.Send(new CreateExpenseCategoryCommand(dto)));

    [HttpPut]
    public async Task<IActionResult> Update(UpdateExpenseCategoryDto dto)
        => Ok(await mediator.Send(new UpdateExpenseCategoryCommand(dto)));

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(long id)
    {
        await mediator.Send(new DeleteExpenseCategoryCommand(id));
        return NoContent();
    }
}
