using MediatR;
using System.Reflection.Metadata;
using WebMonyAPI.Commands.Operations;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Entities.Base;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Operations;

public class DeleteOperationHandler(
    IGenericRepository<OperationEntity, long> repo,
    IGenericRepository<BalanceEntity, long> balanceRepo,
    IGenericRepository<CategoryEntity, long> categoryRepo,
    IIdentityService identityService
    )
    : IRequestHandler<DeleteOperationCommand,Unit>
{
    public async Task<Unit> Handle(
        DeleteOperationCommand request,
        CancellationToken cancellationToken)
    {
        long userId = await identityService.GetUserIdAsync();

        var balancesSpec = new BalanceWithCurrencySpecification(userId);
        var balances = await balanceRepo.ListAsync(balancesSpec);
        var balancesIds = balances.Select(b => b.Id).ToArray();

        var spec = new OperationWithDetailsSpecification(request.id, balancesIds);
        var res = await repo.ListAsync(spec);
        var operation = res.FirstOrDefault();
        if (operation == null)
            throw new Exception("Not valid operation id");

        var balSpec = new BalanceWithCurrencySpecification(operation.BalanceId);
        var balRes = await balanceRepo.ListAsync(balSpec);
        var balance = balRes.FirstOrDefault();

        var catSpec = new CategoryWithTypeSpecification(operation.CategoryId);
        var catResult = await categoryRepo.ListAsync(catSpec);
        var cat = catResult.FirstOrDefault();

        switch (cat.CategoryType!.Name)
        {
            case "Витрати":
                balance.Amount += operation.InitAmount > operation.CalcAmount
                    ? operation.InitAmount
                    : operation.CalcAmount;
                break;

            case "Доходи":
                balance.Amount -= operation.CalcAmount > operation.InitAmount
                    ? operation.InitAmount
                    : operation.CalcAmount;
                break;

            case "Заощадження":
                balance.Amount -= operation.CalcAmount > operation.InitAmount
                    ? operation.InitAmount
                    : operation.CalcAmount;
                break;
        }

        await repo.DeleteAsync(request.id);
        return Unit.Value;
    }
}
