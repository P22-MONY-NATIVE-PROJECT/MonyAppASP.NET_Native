namespace WebMonyAPI.Dtos.Smtp;

public class EmailMessageDto
{
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public string To { get; set; } = string.Empty;
}
