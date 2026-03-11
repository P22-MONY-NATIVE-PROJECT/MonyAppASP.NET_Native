using AutoMapper;
using MediatR;
using WebMonyAPI.Commands.Operations;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Operations;

public class CreateOperationHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<BalanceEntity, long> balanceRepo,
    IGenericRepository<CategoryEntity, long> catRepo,
    IMapper mapper,
    IIdentityService identityService)
    : IRequestHandler<CreateOperationCommand, OperationDto>
{
    public async Task<OperationDto> Handle(
        CreateOperationCommand request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();

        var ent = mapper.Map<OperationEntity>(request.Model);
        var balSpec = new BalanceWithCurrencySpecification(request.Model.BalanceId, userId);
        var balResult = await balanceRepo.ListAsync(balSpec);
        var bal = balResult.FirstOrDefault();

        var catSpec = new CategoryWithTypeSpecification(request.Model.CategoryId);
        var catResult = await catRepo.ListAsync(catSpec);
        var cat = catResult.FirstOrDefault();

        if (bal != null && cat != null)
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
                
            }
            switch (cat.CategoryType!.Name)
            {
                case "Витрати":
                    bal.Amount -= ent.InitAmount > ent.CalcAmount
                        ? ent.InitAmount
                        : ent.CalcAmount;
                    break;

                case "Доходи":
                    bal.Amount += ent.CalcAmount > ent.InitAmount
                        ? ent.InitAmount
                        : ent.CalcAmount;
                    break;
            }
        }
        await repo.AddAsync(ent);
        await repo.SaveChangesAsync();
        return mapper.Map<OperationDto>(ent);
    }
}
