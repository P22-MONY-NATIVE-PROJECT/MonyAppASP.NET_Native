using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Data;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Auth;

public class RegisterHandler(
    UserManager<UserEntity> userManager,
    IMapper mapper,
    RoleManager<RoleEntity> roleManager,
    IJWTTokenService tokenService,
    IImageService imageService,
    AppDbContext context,
    IUserOnboardingService onboardingService
    ) : IRequestHandler<RegisterCommand, TokenDto>
{
    public async Task<TokenDto> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var existingUser = await userManager.FindByEmailAsync(request.model.Email);
        if (existingUser != null)
        {
            throw new Exception($"Користувач з поштою {request.model.Email} вже зареєстрований");
        }

        var user = mapper.Map<UserEntity>(request.model);

        if (request.model.ImageFile != null)
        {
            user.Image = await imageService.SaveImageAsync(request.model.ImageFile);
        }

        var createResult = await userManager.CreateAsync(user, request.model.Password);

        if (!createResult.Succeeded)
        {
            var errors = string.Join(", ", createResult.Errors.Select(e => e.Description));
            throw new Exception($"Помилка реєстрації: {errors}");
        }

        if (!await roleManager.RoleExistsAsync("User"))
        {
            var roleResult = await roleManager.CreateAsync(new RoleEntity { Name = "User" });
            if (!roleResult.Succeeded)
            {
                throw new Exception("Не вдалося створити системну роль 'User'");
            }
        }

        var roleAddResult = await userManager.AddToRoleAsync(user, "User");
        if (!roleAddResult.Succeeded)
        {
            throw new Exception("Не вдалося призначити роль користувачу");
        }

        try
        {
            await onboardingService.SeedInitialDataAsync(user, cancellationToken);
        }
        catch (Exception ex)
        {
            throw new Exception($"Помилка при створенні початкових даних: {ex.Message}");
        }

        return await tokenService.CreateTokenAsync(user);
    }
}