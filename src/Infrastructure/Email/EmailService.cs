using Club_Manager.Application.Common.Interfaces;
using FluentEmail.Core;

namespace Club_Manager.Infrastructure.Email;

public class EmailService : IEmailService
{
    private readonly IFluentEmail _fluentEmail;

    public EmailService(IFluentEmail fluentEmail)
    {
        _fluentEmail = fluentEmail;
    }

    public async Task<bool> SendEmailAsync(string toReceiver, string subject, string body)
    {
        var email = await _fluentEmail
            .To(toReceiver)
            .Subject(subject)
            .Body(body)
            .SendAsync();
        
        return email.Successful;
    }
}