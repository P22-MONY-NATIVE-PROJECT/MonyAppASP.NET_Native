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
        var user = mapper.Map<UserEntity>(request.model);

        if (request.model.ImageFile != null)
        {
            user.Image = await imageService.SaveImageAsync(request.model.ImageFile);
        }

        var createResult = await userManager.CreateAsync(user, request.model.Password);
        if (!createResult.Succeeded)
            return new TokenDto();

        if (!await roleManager.RoleExistsAsync("User"))
        {
            await roleManager.CreateAsync(new RoleEntity { Name = "User" });
        }

        await userManager.AddToRoleAsync(user, "User");

        await onboardingService.SeedInitialDataAsync(user, cancellationToken);

        return await tokenService.CreateTokenAsync(user);
    }
}