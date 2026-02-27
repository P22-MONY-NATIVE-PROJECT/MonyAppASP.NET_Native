using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Text.Json;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
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

        if (!context.CategoryTypes.Any())
        {
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "JsonData", "typeCategories.json");

            if (File.Exists(jsonFile))
            {
                var jsonData = await File.ReadAllTextAsync(jsonFile);
                try
                {
                    var catTypes= JsonSerializer.Deserialize<List<SeederCategoryModel>>(jsonData);
                    foreach(var catType in catTypes)
                    {
                        var entityType = new CategoryTypeEntity { Name = catType.Name };
                        try
                        {
                            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), catType.Icon.TrimStart('/'));

                            if (File.Exists(imagePath))
                            {
                                var bytes = await File.ReadAllBytesAsync(imagePath);
                                entityType.Icon = await imageService.SaveImageAsync(bytes);
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Image not found: {ex.Message}");
                        }
                        
                        await context.CategoryTypes.AddRangeAsync(entityType);
                        await context.SaveChangesAsync();

                        foreach(var cat in catType.Categories)
                        {
                            var entityCat = new CategoryEntity { Name = cat.Name, CategoryTypeId = entityType.Id };
                            try
                            {
                                var imagePath = Path.Combine(Directory.GetCurrentDirectory(), cat.Icon.TrimStart('/'));
                                if (File.Exists(imagePath))
                                {
                                    var bytes = await File.ReadAllBytesAsync(imagePath);
                                    entityCat.Icon = await imageService.SaveImageAsync(bytes);
                                }
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Image not found: {ex.Message}");
                            }
                            await context.Categories.AddRangeAsync(entityCat);
                            await context.SaveChangesAsync();
                        }

                    }
                    
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

        //сід для запису транзакцій
        if(!await context.Operations.AnyAsync())
        {
            var jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "JsonData", "operations.json");
            if (File.Exists(jsonPath))
            {
                var jsonData = await File.ReadAllTextAsync(jsonPath);
                try
                {
                    var seedOperations = JsonSerializer.Deserialize<List<SeederOperationModel>>(jsonData);

                    foreach (var seedOp in seedOperations)
                    {

                        var operation = mapper.Map<OperationEntity>(seedOp);
                        operation.Charges = mapper.Map<List<OperationChargeEntity>>(seedOp.Charges);
                        await context.Operations.AddAsync(operation);

                    }
                    await context.SaveChangesAsync();
                }
                catch(Exception ex)
                {
                    Console.WriteLine("Seed operations fail", ex.Message);
                }
            }

        }
    }
}
