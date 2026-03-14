using MediatR;
using Microsoft.AspNetCore.Identity;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Auth;

public class EditUserHandler(
    UserManager<UserEntity> userManager,
    IJWTTokenService tokenService,
    IImageService imageService
) : IRequestHandler<EditUserCommand, TokenDto>
{
    public async Task<TokenDto> Handle(EditUserCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByIdAsync(request.UserId);
        if (user == null)
            return null;

        user.FirstName = request.Model.FirstName;
        user.LastName = request.Model.LastName;
        user.Email = request.Model.Email;
        user.UserName = request.Model.Email;

        if (request.Model.ImageFile != null)
            user.Image = await imageService.SaveImageAsync(request.Model.ImageFile);

        var result = await userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return null;

        // Return a fresh token so the frontend stays in sync
        return await tokenService.CreateTokenAsync(user);
    }
}
