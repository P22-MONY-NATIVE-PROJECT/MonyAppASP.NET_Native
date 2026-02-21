using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Interfaces;
using WebMonyAPI.SeedData.Models;

namespace WebMonyAPI.Data;

public static class DbSeeder
{
    public static async Task SeedDataAsync(this WebApplication webApplication)
    {
        using var scope = webApplication.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var mapper = scope.ServiceProvider.GetRequiredService<IMapper>();
        var imageService = scope.ServiceProvider.GetRequiredService<IImageService>();

        context.Database.Migrate();

        if (!await context.CategoryTypes.AnyAsync())
        {
            await context.CategoryTypes.AddRangeAsync(
                new CategoryTypeEntity { Name = "Expense" },
                new CategoryTypeEntity { Name = "Income" },
                new CategoryTypeEntity { Name = "Saving" });
            await context.SaveChangesAsync();
        }

        if (!await context.Categories.AnyAsync())
        {
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "JsonData", "categories.json");
            if (File.Exists(jsonFile))
            {
                var jsonData = await File.ReadAllTextAsync(jsonFile);
                try
                {
                    var items = JsonSerializer.Deserialize<List<SeederBaseCategoryModel>>(jsonData);
                    if (items != null)
                    {
                        var typeByName = await context.CategoryTypes
                            .ToDictionaryAsync(c => c.Name, c => c.Id);

                        foreach (var item in items)
                        {
                            if (!typeByName.TryGetValue(item.CategoryType, out var typeId))
                                continue;

                            var entity = new CategoryBaseEntity
                            {
                                Name = item.Name,
                                CategoryTypeId = typeId
                            };

                            if (!string.IsNullOrWhiteSpace(item.Icon))
                            {
                                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), item.Icon.TrimStart('/'));
                                if (File.Exists(imagePath))
                                {
                                    var bytes = await File.ReadAllBytesAsync(imagePath);
                                    entity.Icon = await imageService.SaveImageAsync(bytes);
                                }
                            }

                            context.Categories.Add(entity);
                        }

                        await context.SaveChangesAsync();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error seeding categories: " + ex.Message);
                }
            }
            else
            {
                Console.WriteLine("SeedData/JsonData/categories.json not found");
            }
        }

        // Сід для валют
        if (!context.Currencies.Any()) 
        {
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "JsonData", "currencies.json");

            if (File.Exists(jsonFile))
            {
                var jsonData = await File.ReadAllTextAsync(jsonFile);
                try
                {
                    var categories = JsonSerializer.Deserialize<List<SeederCurrencyModel>>(jsonData);
                    var entityItems = mapper.Map<List<CurrencyEntity>>(categories);
                    
                    await context.Currencies.AddRangeAsync(entityItems);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error Json Parse Data", ex.Message);
                }
            }
            else
            {
                Console.WriteLine("Not found file expenseCategories.json");
            }
        }

        // Сід для балансів
        if (!await context.Balances.AnyAsync())
        {
            var jsonPath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "SeedData",
                "JsonData",
                "balances.json");

            if (!File.Exists(jsonPath))
                Console.WriteLine("balances.json not found");

            var json = await File.ReadAllTextAsync(jsonPath);

            var seedModels = JsonSerializer.Deserialize<List<SeederBalanceModel>>(json)
                ?? throw new Exception("Failed to deserialize balances.json");

            var currencyCodes = seedModels
                .Select(x => x.CurrencyCode)
                .Distinct()
                .ToList();

            var currencyMap = await context.Currencies
                .Where(c => currencyCodes.Contains(c.Code))
                .ToDictionaryAsync(c => c.Code, c => c.Id);

            var entities = new List<BalanceEntity>();

            foreach (var model in seedModels)
            {
                if (!currencyMap.TryGetValue(model.CurrencyCode, out var currencyId))
                    Console.WriteLine($"Currency not found: {model.CurrencyCode}");

                var entity = mapper.Map<BalanceEntity>(model);
                entity.CurrencyId = currencyId;

                if (!string.IsNullOrWhiteSpace(entity.Icon))
                {
                    var imagePath = Path.Combine(
                        Directory.GetCurrentDirectory(),
                        entity.Icon.TrimStart('/'));

                    if (File.Exists(imagePath))
                    {
                        var bytes = await File.ReadAllBytesAsync(imagePath);
                        entity.Icon = await imageService.SaveImageAsync(bytes);
                    }
                }

                entities.Add(entity);
            }

            await context.Balances.AddRangeAsync(entities);
            await context.SaveChangesAsync();
        }
    }
}
