using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Constants;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Controllers;

[ApiController]
[Route("api/expense-categories")]
public class ExpenseCategoriesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok(await mediator.Send(new GetCategoriesQuery(CategoryTypeIds.Expense)));

    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
        => Ok(await mediator.Send(new GetCategoryByIdQuery(id)));

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create(
        [FromForm] CreateCategoryDto dto)
    {
        return Ok(await mediator
            .Send(new CreateCategoryCommand(dto, CategoryTypeIds.Expense)));
    }

    [HttpPut]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Update(
        [FromForm] UpdateCategoryDto dto)
    {
        return Ok(await mediator
            .Send(new UpdateCategoryCommand(dto)));
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await mediator.Send(new DeleteCategoryCommand(id));
        return Ok();
    }
}
