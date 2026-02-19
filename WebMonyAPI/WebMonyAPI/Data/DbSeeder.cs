using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using System.Text.Json;
using WebMonyAPI.Entities.Categories;
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
        if (!context.ExpenseCategories.Any())
        {
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "JsonData", "expenseCategories.json");

            if (File.Exists(jsonFile))
            {
                var jsonData = await File.ReadAllTextAsync(jsonFile);
                try
                {
                    var categories = JsonSerializer.Deserialize<List<SeederBaseCategoryModel>>(jsonData);
                    var entityItems = mapper.Map<List<ExpenseCategoryEntity>>(categories);
                    foreach (var entity in entityItems)
                    {
                        try
                        {
                            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), entity.Icon.TrimStart('/'));

                            if (File.Exists(imagePath))
                            {
                                var bytes = await File.ReadAllBytesAsync(imagePath);
                                entity.Icon = await imageService.SaveImageAsync(bytes);
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Image not found: {ex.Message}");
                        }

                    }
                    await context.ExpenseCategories.AddRangeAsync(entityItems);
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
        if (!context.IncomeCategories.Any())
        {
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "JsonData", "incomeCategories.json");

            if (File.Exists(jsonFile))
            {
                var jsonData = await File.ReadAllTextAsync(jsonFile);
                try
                {
                    var categories = JsonSerializer.Deserialize<List<SeederBaseCategoryModel>>(jsonData);
                    var entityItems = mapper.Map<List<IncomeCategoryEntity>>(categories);
                    foreach (var entity in entityItems)
                    {
                        try
                        {
                            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), entity.Icon.TrimStart('/'));

                            if (File.Exists(imagePath))
                            {
                                var bytes = await File.ReadAllBytesAsync(imagePath);
                                entity.Icon = await imageService.SaveImageAsync(bytes);
                            }
                        }
                        catch(Exception ex)
                        {
                            Console.WriteLine($"Image not found: {ex.Message}");
                        }

                    }
                    await context.IncomeCategories.AddRangeAsync(entityItems);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error Json Parse Data", ex.Message);
                }
            }
            else
            {
                Console.WriteLine("Not found file incomeCategories.json");
            }
        }

        if (!context.SavingCategories.Any())
        {
            var jsonFile = Path.Combine(Directory.GetCurrentDirectory(), "SeedData", "JsonData", "savingCategories.json");

            if (File.Exists(jsonFile))
            {
                var jsonData = await File.ReadAllTextAsync(jsonFile);
                try
                {
                    var categories = JsonSerializer.Deserialize<List<SeederBaseCategoryModel>>(jsonData);
                    var entityItems = mapper.Map<List<SavingCategoryEntity>>(categories);
                    foreach (var entity in entityItems)
                    {
                        try
                        {
                            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), entity.Icon.TrimStart('/'));

                            if (File.Exists(imagePath))
                            {
                                var bytes = await File.ReadAllBytesAsync(imagePath);
                                entity.Icon = await imageService.SaveImageAsync(bytes);
                            }
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Image not found: {ex.Message}");
                        }

                    }
                    await context.SavingCategories.AddRangeAsync(entityItems);
                    await context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error Json Parse Data", ex.Message);
                }
            }
            else
            {
                Console.WriteLine("Not found file savingCategories.json");
            }
        }
    }
}
