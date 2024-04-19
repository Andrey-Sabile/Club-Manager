using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Tickets.Commands.CreateTicket;

public record CreateTicketCommand : IRequest
{
    public int EventId { get; init; }
    
    public int TicketTypeId { get; init; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Email { get; set; }
    
    public int Quantity { get; set; }
    
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
        for (int i = 0; i < request.Quantity; i++)
        {
            var entity = new Ticket
            {
                EventId = request.EventId,
                TicketTypeId = request.TicketTypeId,
                FirstName = request.FirstName, 
                LastName = request.LastName, 
                Email = request.Email
            };

            _context.Tickets.Add(entity);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
