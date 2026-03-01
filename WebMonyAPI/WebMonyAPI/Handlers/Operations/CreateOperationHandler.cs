using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebMonyAPI.Commands.Operations;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Operations;

public class CreateOperationHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<OperationChargeEntity, long> chargesRepo,
    IMapper mapper)
    : IRequestHandler<CreateOperationCommand, OperationDto>
{
    public async Task<OperationDto> Handle(
        CreateOperationCommand request,
        CancellationToken cancellationToken)
    {
        var ent = mapper.Map<OperationEntity>(request.Model);
        Console.WriteLine(ent);
        return null;
    }
}
