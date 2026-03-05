using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using WebMonyAPI.Commands.Category;
using WebMonyAPI.Dtos.Categories;
using WebMonyAPI.Queries.Categories;

namespace WebMonyAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController(IMediator mediator) : ControllerBase
{
    [HttpGet]
    [Authorize]
    public async Task<IActionResult> Get(int typeId)
    {
        try
        {
            var result = await mediator.Send(new GetCategoriesQuery(typeId));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("all-category-types")]
    [Authorize]
    public async Task<IActionResult> GetAllTypes()
    {
        try
        {
            var result = await mediator.Send(new GetAllCategoryTypesQuery());
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("{id:long}")]
    [Authorize]
    public async Task<IActionResult> Get(long id)
    {
        try
        {
            var result = await mediator.Send(new GetCategoryByIdQuery(id));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    [HttpPost]
    [Consumes("multipart/form-data")]
    [Authorize]
    public async Task<IActionResult> Create([FromForm] CreateCategoryDto dto)
    {
        try
        {
            var result = await mediator.Send(new CreateCategoryCommand(dto));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut]
    [Consumes("multipart/form-data")]
    [Authorize]
    public async Task<IActionResult> Update([FromForm] UpdateCategoryDto dto)
    {
        try
        {
            var result = await mediator.Send(new UpdateCategoryCommand(dto));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id:long}")]
    [Authorize]
    public async Task<IActionResult> Delete(long id)
    {
        try
        {
            await mediator.Send(new DeleteCategoryCommand(id));
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}