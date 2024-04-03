namespace Club_Manager.Application.Common.Interfaces;

public interface IEmailService
{
    Task<bool> SendEmailAsync(string? toReceiver, string subject, string body);
}