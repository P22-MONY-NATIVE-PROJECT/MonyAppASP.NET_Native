using System.Net.Mail;
using WebMonyAPI.Dtos.Smtp;

namespace WebMonyAPI.Interfaces;

public interface ISmtpService
{
    Task<bool> SendEmailAsync(EmailMessageDto message);
}
