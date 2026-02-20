using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Controllers;

[ApiController]
[Route("api/income-categories")]
public class IncomeCategoriesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> Get()
        => Ok(await mediator.Send(new GetCategoriesQuery()));

    [HttpGet("{id:long}")]
    public async Task<IActionResult> Get(long id)
        => Ok(await mediator.Send(new GetCategoryByIdQuery(id)));

    [HttpPost]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> Create(
        [FromForm] CreateCategoryDto dto)
    {
        return Ok(await mediator
            .Send(new CreateCategoryCommand(dto)));
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
