using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Data;
using WebMonyAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace WebMonyAPI.Services;

public class UserOnboardingService(IImageService imageService, AppDbContext context, AutoMapper.IMapper mapper) : IUserOnboardingService
{
    public async Task SeedInitialDataAsync(UserEntity user, CancellationToken cancellationToken = default)
    {
        var existingCategoryTypes = await context.CategoryTypes.ToListAsync(cancellationToken);

        var jsonFile = Path.Combine(
            Directory.GetCurrentDirectory(),
            "SeedData",
            "JsonData",
            "typeCategories.json");

        if (File.Exists(jsonFile))
        {
            var jsonData = await File.ReadAllTextAsync(jsonFile, cancellationToken);
            var catTypes = System.Text.Json.JsonSerializer.Deserialize<List<WebMonyAPI.SeedData.Models.SeederCategoryModel>>(jsonData);

            if (catTypes != null)
            {
                foreach (var catType in catTypes)
                {
                    var entityType = existingCategoryTypes
                        .FirstOrDefault(ct => ct.Name == catType.Name);

                    if (entityType == null)
                        continue;

                    foreach (var cat in catType.Categories)
                    {
                        var entityCat = new WebMonyAPI.Entities.Categories.CategoryEntity
                        {
                            Name = cat.Name,
                            CategoryTypeId = entityType.Id,
                            UserId = user.Id
                        };

                        if (!string.IsNullOrWhiteSpace(cat.Icon))
                        {
                            var imagePath = Path.Combine(
                                Directory.GetCurrentDirectory(),
                                cat.Icon.TrimStart('/'));

                            if (File.Exists(imagePath))
                            {
                                var bytes = await File.ReadAllBytesAsync(imagePath, cancellationToken);
                                entityCat.Icon = await imageService.SaveImageAsync(bytes);
                            }
                        }

                        context.Categories.Add(entityCat);
                    }

                    await context.SaveChangesAsync(cancellationToken);
                }
            }
        }

        var balancePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            "SeedData",
            "JsonData",
            "balances.json");

        if (File.Exists(balancePath))
        {
            var balancesJson = await File.ReadAllTextAsync(balancePath, cancellationToken);
            var seedModels = System.Text.Json.JsonSerializer.Deserialize<List<WebMonyAPI.SeedData.Models.SeederBalanceModel>>(balancesJson);

            if (seedModels != null)
            {
                var currencyCodes = seedModels
                    .Select(x => x.CurrencyCode)
                    .Distinct()
                    .ToList();

                var currencyMap = await context.Currencies
                    .Where(c => currencyCodes.Contains(c.Code))
                    .ToDictionaryAsync(c => c.Code, c => c.Id, cancellationToken);

                var balances = new List<WebMonyAPI.Entities.Finances.BalanceEntity>();

                foreach (var model in seedModels)
                {
                    if (!currencyMap.TryGetValue(model.CurrencyCode, out var currencyId))
                        continue;

                    var entity = mapper.Map<WebMonyAPI.Entities.Finances.BalanceEntity>(model);
                    entity.CurrencyId = currencyId;
                    entity.UserId = user.Id;

                    if (!string.IsNullOrWhiteSpace(entity.Icon))
                    {
                        var imagePath = Path.Combine(
                            Directory.GetCurrentDirectory(),
                            entity.Icon.TrimStart('/'));

                        if (File.Exists(imagePath))
                        {
                            var bytes = await File.ReadAllBytesAsync(imagePath, cancellationToken);
                            entity.Icon = await imageService.SaveImageAsync(bytes);
                        }
                    }

                    balances.Add(entity);
                }

                await context.Balances.AddRangeAsync(balances, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
