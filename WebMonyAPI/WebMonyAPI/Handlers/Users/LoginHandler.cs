using MediatR;
using Microsoft.AspNetCore.Identity;
using WebMonyAPI.Commands.User;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Users;

public class LoginHandler(UserManager<UserEntity> userManager, IJWTTokenService tokenService) : IRequestHandler<LoginCommand, string>
{
    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.model.Email);

        if (user == null)
            return string.Empty;

        var isValidPassword = await userManager.CheckPasswordAsync(user, request.model.Password);
        if (!isValidPassword)
            return string.Empty;

        user.IsDeleted = false;
        await userManager.UpdateAsync(user);

        return await tokenService.CreateTokenAsync(user);
    }
}
