using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebMonyAPI.Commands.Operations;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Operations;

public class CreateOperationHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<BalanceEntity, long> balanceRepo,
    IMapper mapper)
    : IRequestHandler<CreateOperationCommand, OperationDto>
{
    public async Task<OperationDto> Handle(
        CreateOperationCommand request,
        CancellationToken cancellationToken)
    {
        var ent = mapper.Map<OperationEntity>(request.Model);
        var spec = new BalanceWithCurrencySpecification(request.Model.BalanceId);
        var result = await balanceRepo.ListAsync(spec);
        var bal = result.FirstOrDefault();
        
        if (bal != null)
        {
            foreach(var ch in ent.Charges!)
            {
                decimal amount = 0;
                if (ch.Amount > 0)
                {
                    amount = ch.Amount;
                }
                else
                {
                    if (ch.Percentage > 0)
                    {
                        amount = ent.InitAmount * (ch.Percentage / 100);
                    }
                    else
                        continue;
                    
                }
                if (ch.ApplicationType == ChargeApplicationType.Included)
                {
                    amount = 0;
                }
                if (ch.ApplicationType == ChargeApplicationType.Subtract)
                {
                    amount *= -1;
                }

                ent.CalcAmount += amount;
                if (ent.InitAmount > ent.CalcAmount)
                    bal.Amount -= ent.InitAmount;
                else
                    bal.Amount -= ent.CalcAmount;
            }
        }
        await repo.AddAsync(ent);
        await repo.SaveChangesAsync();
        return mapper.Map<OperationDto>(ent);
    }
}
