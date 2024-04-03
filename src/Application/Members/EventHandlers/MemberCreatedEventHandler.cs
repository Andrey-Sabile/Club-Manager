using Club_Manager.Domain.Events;
using Club_Manager.Application.Common.Interfaces;
using Microsoft.Extensions.Logging;

namespace Club_Manager.Application.Members.EventHandlers;

public class MemberCreatedEventHandler : INotificationHandler<MemberCreatedEvent>
{
    private readonly ILogger<MemberCreatedEventHandler> _logger;
    private readonly IEmailService _emailService;

    public MemberCreatedEventHandler(ILogger<MemberCreatedEventHandler> logger, IEmailService emailService)
    {
        _logger = logger;
        _emailService = emailService;
    }

    public async Task Handle(MemberCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Club_Manager Domain Event: {DomainEvent}",
        notification.GetType().Name);

        var subject = "Hello World!";
        var body = "YEEEESSSSS This is sent via API";
        var success = await _emailService.SendEmailAsync(notification.Member.EmailAddress, subject, body); 
    }
}