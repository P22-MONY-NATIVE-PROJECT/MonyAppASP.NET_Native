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

public class UpdateOperationHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<BalanceEntity, long> balanceRepo,
    IGenericRepository<CategoryEntity, long> categoryRepo,
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

        if (entity.Charges == null || entity.Charges.Count == 0)
            throw new Exception("Charges not found");

        var balSpec = new BalanceWithCurrencySpecification(request.Model.BalanceId);
        var balResult = await balanceRepo.ListAsync(balSpec);
        var bal = balResult.FirstOrDefault();
        if (bal == null)
            throw new Exception("Balance not found");

        var catSpec = new CategoryWithTypeSpecification(request.Model.CategoryId);
        var catResult = await categoryRepo.ListAsync(catSpec);
        var cat = catResult.FirstOrDefault();
        if (cat == null)
            throw new Exception("Category not found");

        mapper.Map(request.Model, entity);

        var maxAmount = Math.Max(entity.InitAmount, entity.CalcAmount);
        var minAmount = Math.Min(entity.InitAmount, entity.CalcAmount);

        switch (cat.CategoryType!.Name)
        {
            case "Витрати":
                bal.Amount += entity.InitAmount > entity.CalcAmount
                    ? entity.InitAmount
                    : entity.CalcAmount;
                break;

            case "Доходи":
                bal.Amount -= entity.CalcAmount > entity.InitAmount
                    ? entity.InitAmount
                    : entity.CalcAmount;
                break;
        }

        entity.InitAmount = entity.CalcAmount = request.Model.Amount;

        foreach (var ch in entity.Charges!)
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
                    amount = entity.InitAmount * (ch.Percentage / 100);
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

            entity.CalcAmount += amount;

        }
        switch (cat.CategoryType!.Name)
        {
            case "Витрати":
                bal.Amount -= entity.InitAmount > entity.CalcAmount
                    ? entity.InitAmount
                    : entity.CalcAmount;
                break;

            case "Доходи":
                bal.Amount += entity.CalcAmount > entity.InitAmount
                    ? entity.InitAmount
                    : entity.CalcAmount;
                break;
        }

        await repo.UpdateAsync(entity);

        return mapper.Map<OperationDto>(entity);
    }
}

