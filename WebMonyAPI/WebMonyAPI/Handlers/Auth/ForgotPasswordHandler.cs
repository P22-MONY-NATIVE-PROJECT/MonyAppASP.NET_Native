using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Net.Mail;
using WebMonyAPI.Commands.Auth;
using WebMonyAPI.Commands.User;
using WebMonyAPI.Dtos.Smtp;
using WebMonyAPI.Entities.Identity;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Handlers.Auth;

public class ForgotPasswordHandler(UserManager<UserEntity> userManager, 
    IConfiguration configuration, 
    ISmtpService smtpService) : IRequestHandler<ForgotPasswordCommand, bool>
{
    public async Task<bool> Handle(ForgotPasswordCommand request, CancellationToken cancellationToken)
    {
        var user = await userManager.Users.FirstOrDefaultAsync(x => x.Email == request.modal.Email && !x.IsDeleted);

        if (user == null)
        {
            return false;
        }

        var code = RandomNumberGenerator.GetInt32(100000, 1000000).ToString();

        var expiresAtUtc = DateTime.UtcNow.AddMinutes(15);
        var tokenValue = $"{code}:{expiresAtUtc:o}";

        await userManager.SetAuthenticationTokenAsync(
            user,
            "PasswordReset",
            "ResetCode",
            tokenValue);

        var emailModel = new EmailMessageDto
        {
            To = request.modal.Email,
            Subject = "Password Reset",
            Body = $@"<!DOCTYPE html>
            <html lang=""uk"">
                <head>
                    <meta charset=""UTF-8"">
                    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                    <title>Відновлення пароля</title>
                </head>
                <body style=""margin:0; padding:0; background-color:#000000; font-family:Arial,sans-serif; color:white;"">
                    <div style=""max-width:600px; margin:0 auto; padding:40px 20px; text-align:center;"">

                        <h1 style=""font-size:28px; font-weight:bold; text-transform:uppercase; margin-bottom:16px;"">
                            Відновлення <span style=""color:#22c55e;"">пароля</span>
                        </h1>

                        <p style=""font-size:16px; color:#d1d5db; margin-bottom:32px;"">
                            Ми отримали запит на відновлення пароля для вашого акаунта.
                            Використайте наведений нижче код для зміни пароля в застосунку.
                        </p>

                        <div style=""font-size:32px; font-weight:bold; letter-spacing:8px; margin-bottom:24px;"">
                            {code}
                        </div>

                        <p style=""font-size:12px; color:#9ca3af; margin-top:24px;"">
                            Якщо ви не запитували відновлення пароля, просто ігноруйте цей лист.
                        </p>

                        <p style=""font-size:12px; color:#6b7280; margin-top:32px;"">
                            © 2026 F-track. Всі права захищені.
                        </p>

                    </div>
                </body>
            </html>"
        };

        var result = await smtpService.SendEmailAsync(emailModel);

        return result;
    }
}
