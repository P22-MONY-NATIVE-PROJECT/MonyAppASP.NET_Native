using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Data;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;
using WebMonyAPI.SeedData.Models;
using WebMonyAPI.Services;

namespace WebMonyAPI.Handlers.Auth;

public class RegisterHandler(
    UserManager<UserEntity> userManager,
    IMapper mapper,
    RoleManager<RoleEntity> roleManager,
    IJWTTokenService tokenService,
    IImageService imageService,
    AppDbContext context
    ) : IRequestHandler<RegisterCommand, string>
{
    public async Task<string> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var user = mapper.Map<UserEntity>(request.model);

        if (request.model.ImageFile != null)
        {
            user.Image = await imageService.SaveImageAsync(request.model.ImageFile);
        }

        var createResult = await userManager.CreateAsync(user, request.model.Password);
        if (!createResult.Succeeded)
            return string.Empty;

        if (!await roleManager.RoleExistsAsync("User"))
        {
            await roleManager.CreateAsync(new RoleEntity { Name = "User" });
        }

        await userManager.AddToRoleAsync(user, "User");

        var existingCategoryTypes = await context.CategoryTypes.ToListAsync(cancellationToken);

        var jsonFile = Path.Combine(
            Directory.GetCurrentDirectory(),
            "SeedData",
            "JsonData",
            "typeCategories.json");

        if (File.Exists(jsonFile))
        {
            var jsonData = await File.ReadAllTextAsync(jsonFile, cancellationToken);
            var catTypes = JsonSerializer.Deserialize<List<SeederCategoryModel>>(jsonData);

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
                        var entityCat = new CategoryEntity
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
            var json = await File.ReadAllTextAsync(balancePath, cancellationToken);
            var seedModels = JsonSerializer.Deserialize<List<SeederBalanceModel>>(json);

            if (seedModels != null)
            {
                var currencyCodes = seedModels
                    .Select(x => x.CurrencyCode)
                    .Distinct()
                    .ToList();

                var currencyMap = await context.Currencies
                    .Where(c => currencyCodes.Contains(c.Code))
                    .ToDictionaryAsync(c => c.Code, c => c.Id, cancellationToken);

                var balances = new List<BalanceEntity>();

                foreach (var model in seedModels)
                {
                    if (!currencyMap.TryGetValue(model.CurrencyCode, out var currencyId))
                        continue;

                    var entity = mapper.Map<BalanceEntity>(model);
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

        return await tokenService.CreateTokenAsync(user);
    }
}