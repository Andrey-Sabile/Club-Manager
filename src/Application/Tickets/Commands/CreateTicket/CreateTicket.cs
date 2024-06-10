using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;
using Club_Manager.Domain.Events;

namespace Club_Manager.Application.Tickets.Commands.CreateTicket;

public record CreateTicketCommand : IRequest
{
    public int EventId { get; init; }
        
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Email { get; set; }

    public IList<TicketTypeQuantityDto> TicketTypes{ get; set; } = new List<TicketTypeQuantityDto>();
}

public class CreateTicketCommandHandler : IRequestHandler<CreateTicketCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateTicketCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(CreateTicketCommand request, CancellationToken cancellationToken)
    {
        foreach (var ticketType in request.TicketTypes)
        {
            for (int i = 0; i < ticketType.TicketQuantity; i++)
            {
                var entity = new Ticket
                {
                    EventId = request.EventId,
                    TicketTypeId = ticketType.TicketTypeId,
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    Email = request.Email,
                };
                _context.Tickets.Add(entity);
                entity.AddDomainEvent(new TicketCreatedEvent(entity));
            }
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
