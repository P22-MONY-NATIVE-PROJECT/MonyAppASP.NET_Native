using MediatR;
using Microsoft.AspNetCore.Identity;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Auth;

public class UpdatePushTokenHandler(
    UserManager<UserEntity> userManager,
    IIdentityService identityService)
    : IRequestHandler<UpdatePushTokenCommand, bool>
{
    public async Task<bool> Handle(UpdatePushTokenCommand request, CancellationToken cancellationToken)
    {
        var userId = await identityService.GetUserIdAsync();
        var user = await userManager.FindByIdAsync(userId.ToString());
        
        if (user == null) return false;

        user.PushToken = request.PushToken;
        var result = await userManager.UpdateAsync(user);

        return result.Succeeded;
    }
}
