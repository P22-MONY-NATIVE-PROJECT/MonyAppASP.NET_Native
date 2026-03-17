using MediatR;
using Microsoft.AspNetCore.Identity;
using WebMonyAPI.Commands.User;
using WebMonyAPI.Dtos.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Auth;

public class LoginHandler(UserManager<UserEntity> userManager, IJWTTokenService tokenService) : IRequestHandler<LoginCommand, TokenDto>
{
    public async Task<TokenDto> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.FindByEmailAsync(request.model.Email);

        if (user == null)
            return new TokenDto();

        var isValidPassword = await userManager.CheckPasswordAsync(user, request.model.Password);
        if (!isValidPassword)
            return new TokenDto();

        user.IsDeleted = false;
        await userManager.UpdateAsync(user);

        return await tokenService.CreateTokenAsync(user);
    }
}
