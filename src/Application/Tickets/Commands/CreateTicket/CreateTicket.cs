using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Tickets.Commands.CreateTicket;

public record CreateTicketCommand : IRequest<int>
{
    public int EventId { get; init; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Email { get; set; }
    
}

public class CreateTicketCommandHandler : IRequestHandler<CreateTicketCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateTicketCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateTicketCommand request, CancellationToken cancellationToken)
    {
        var entity = new Ticket
        {
            EventId = request.EventId, 
            FirstName = request.FirstName, 
            LastName = request.LastName, 
            Email = request.Email
        };

        _context.Tickets.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
