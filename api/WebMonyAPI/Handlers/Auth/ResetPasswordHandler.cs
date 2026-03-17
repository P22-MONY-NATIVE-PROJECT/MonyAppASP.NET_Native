using System.Globalization;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Entities.Identity;

namespace WebMonyAPI.Handlers.Auth;

public class ResetPasswordHandler(UserManager<UserEntity> userManager)
    : IRequestHandler<ResetPasswordCommand, bool>
{
    public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.Users
            .FirstOrDefaultAsync(x => x.Email == request.model.Email && !x.IsDeleted, cancellationToken);

        if (user is null)
        {
            return false;
        }

        var storedToken = await userManager.GetAuthenticationTokenAsync(
            user,
            "PasswordReset",
            "ResetCode");

        if (string.IsNullOrWhiteSpace(storedToken))
        {
            return false;
        }

        var parts = storedToken.Split(':', 2);
        if (parts.Length != 2)
        {
            return false;
        }

        var storedCode = parts[0];
        var expiresAtString = parts[1];

        if (!string.Equals(storedCode, request.model.Code, StringComparison.Ordinal))
        {
            return false;
        }

        if (!DateTime.TryParse(
                expiresAtString,
                null,
                DateTimeStyles.RoundtripKind,
                out var expiresAtUtc))
        {
            return false;
        }

        if (expiresAtUtc < DateTime.UtcNow)
        {
            return false;
        }

        user.PasswordHash = userManager.PasswordHasher.HashPassword(user, request.model.NewPassword);

        var updateResult = await userManager.UpdateAsync(user);
        if (!updateResult.Succeeded)
        {
            return false;
        }

        await userManager.RemoveAuthenticationTokenAsync(
            user,
            "PasswordReset",
            "ResetCode");

        return true;
    }
}

