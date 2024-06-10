using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Events;
using Microsoft.Extensions.Logging;

namespace Club_Manager.Application.Tickets.EventHandlers;

public class TicketCreatedEventHandler : INotificationHandler<TicketCreatedEvent>
{
    private readonly ILogger<TicketCreatedEventHandler> _logger;
    private readonly IEmailService _emailService;

    public TicketCreatedEventHandler(
        ILogger<TicketCreatedEventHandler> logger,
        IEmailService emailService)
    {
        _logger = logger;
        _emailService = emailService;
    }

    public async Task Handle(TicketCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Club_Manager Domain Event: {DomainEvent}", notification.GetType().Name);

        var subject = "Ticket Confirmation";
        var body = "This is to certify that you bought tickets";
        var success = await _emailService.SendEmailAsync(notification.Ticket.Email, subject, body);
    }
}