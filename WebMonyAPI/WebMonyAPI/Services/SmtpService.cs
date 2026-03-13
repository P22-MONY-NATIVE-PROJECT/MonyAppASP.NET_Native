using MailKit.Net.Smtp;
using MimeKit;
using WebMonyAPI.Dtos.Smtp;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Services;

public class SmtpService : ISmtpService
{
    public async Task<bool> SendEmailAsync(EmailMessageDto message)
    {
        var body = new TextPart("html")
        {
            Text = message.Body
        };
        var multipart = new MimeKit.Multipart("mixed");
        multipart.Add(body);

        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("CounterWatch", EmailConfigurationDto.From));
        emailMessage.To.Add(new MailboxAddress(message.To, message.To));
        emailMessage.Subject = message.Subject;

        emailMessage.Body = multipart;

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(EmailConfigurationDto.SmtpServer, EmailConfigurationDto.Port, true);
            await client.AuthenticateAsync(EmailConfigurationDto.UserName, EmailConfigurationDto.Password);
            await client.SendAsync(emailMessage);
            await client.DisconnectAsync(true);

            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine("Error send EMAIL {0}", ex.Message);
        }
        return false;
    }
}
