using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Tickets.Queries.GetTicketsSold;

public record GetTicketsSoldQuery(int EventId) : IRequest<SoldTicketsDto>;

public class GetTicketsSoldQueryHandler : IRequestHandler<GetTicketsSoldQuery, SoldTicketsDto>
{
    private readonly IApplicationDbContext _context;

    public GetTicketsSoldQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task<SoldTicketsDto> Handle(GetTicketsSoldQuery request, CancellationToken cancellationToken)
    {
        var eventEntity = await _context.Events
            .SingleAsync(e => e.Id == request.EventId, cancellationToken); 
        Guard.Against.NotFound(request.EventId, eventEntity);

        var ticketsSold = _context.Tickets
            .Count(t => t.EventId == request.EventId);

        var totalTickets = _context.TicketTypes
            .Where(ticketType => ticketType.EventId == request.EventId)
            .Sum(ticketType => ticketType.Quantity);
        
        return new SoldTicketsDto
        {
            TicketsSold = ticketsSold, TotalTickets = totalTickets,
        };
    }
}
