using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebMonyAPI.Commands.Finances;
using WebMonyAPI.Commands.Operations;
using WebMonyAPI.Dtos.Finances;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Extensions;
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

        [HttpGet("charge-application-types")]
        public IActionResult GetChargeApplicationTypes()
        {
            var values = Enum.GetValues(typeof(ChargeApplicationType))
                .Cast<ChargeApplicationType>()
                .Select(e => new
                {
                    Id = (int)e,
                    Name = e.ToUkrainian()
                });

            return Ok(values);
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOperationDto dto)
        => Ok(await mediator.Send(new CreateOperationCommand(dto)));

        [HttpGet("{id:long}")]
        public async Task<IActionResult> GetById(long id)
        => Ok(await mediator.Send(new GetOperationByIdQuery(id)));

        [HttpPut]
        public async Task<IActionResult> Update(UpdateOperationDto dto)
        => Ok(await mediator.Send(new UpdateOperationCommand(dto)));

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> Delete(long id)
        {
            await mediator.Send(new DeleteOperationCommand(id));
            return NoContent();
        }
    }
}
