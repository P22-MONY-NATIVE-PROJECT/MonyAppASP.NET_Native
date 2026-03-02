using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Services;

namespace WebMonyAPI.Handlers.Auth;

public class RegisterHandler(
    UserManager<UserEntity> userManager, 
    IMapper mapper, 
    RoleManager<RoleEntity> roleManager, 
    IJWTTokenService tokenService,
    IImageService imageService
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
            await roleManager.CreateAsync(new RoleEntity
            {
                Name = "User"
            });
        }

        await userManager.AddToRoleAsync(user, "User");
        return await tokenService.CreateTokenAsync(user);
    }
}
