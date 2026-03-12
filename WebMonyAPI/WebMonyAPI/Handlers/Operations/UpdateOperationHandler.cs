using AutoMapper;
using MediatR;
using WebMonyAPI.Commands.Operations;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Dtos.Operations;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Operations;

public class UpdateOperationHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<BalanceEntity, long> balanceRepo,
    IMapper mapper,
    IIdentityService identityService
)
: IRequestHandler<UpdateOperationCommand, OperationDto>
{
    public async Task<OperationDto> Handle(
        UpdateOperationCommand request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();

        var balancesSpec = new BalanceWithCurrencySpecification(userId);
        var balances = await balanceRepo.ListAsync(balancesSpec);
        var balancesIds = balances.Select(b => b.Id).ToArray();

        var spec = new OperationWithDetailsSpecification(request.Model.Id, balancesIds);
        var res = await repo.ListAsync(spec);

        var entity = res.FirstOrDefault();
        if (entity == null)
            throw new Exception("Operation not found");

        var bal = entity.Balance;
        if (bal == null)
            throw new Exception("Balance not found");

        var cat = entity.Category;
        if (cat == null)
            throw new Exception("Category not found");

        switch (cat.CategoryType!.Name)
        {
            case "Витрати":
                bal.Amount += Math.Max(entity.InitAmount, entity.CalcAmount);
                break;

            case "Доходи":
                bal.Amount -= Math.Max(entity.InitAmount, entity.CalcAmount);
                break;
            
            case "Заощадження":
                bal.Amount -= Math.Max(entity.InitAmount, entity.CalcAmount);
                break;
        }

        mapper.Map(request.Model, entity);

        if (entity.BalanceId != entity.Balance?.Id)
        {
            entity.Balance = balances.FirstOrDefault(b => b.Id == entity.BalanceId);
        }

        entity.InitAmount = request.Model.Amount;
        entity.CalcAmount = request.Model.Amount;

        if (entity.Charges != null)
        {
            foreach (var ch in entity.Charges)
            {
                decimal amount = 0;

                if (ch.Amount > 0)
                    amount = ch.Amount;
                else if (ch.Percentage > 0)
                    amount = entity.InitAmount * (ch.Percentage / 100);
                else
                    continue;

                if (ch.ApplicationType == ChargeApplicationType.Included)
                    amount = 0;

                if (ch.ApplicationType == ChargeApplicationType.Subtract)
                    amount *= -1;

                entity.CalcAmount += amount;
            }
        }

        switch (cat.CategoryType!.Name)
        {
            case "Витрати":
                entity.Balance.Amount -= Math.Max(entity.InitAmount, entity.CalcAmount);
                break;

            case "Доходи":
                entity.Balance.Amount += Math.Max(entity.InitAmount, entity.CalcAmount);
                break;

            case "Заощадження":
                bal.Amount += Math.Max(entity.InitAmount, entity.CalcAmount);
                break;
        }

        await repo.UpdateAsync(entity);

        return mapper.Map<OperationDto>(entity);
    }
}