using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebMonyAPI.Queries.Operations;

namespace WebMonyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OperationsController(IMediator mediator) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        => Ok(await mediator.Send(new GetAllOperationsQuery()));
    }
}
