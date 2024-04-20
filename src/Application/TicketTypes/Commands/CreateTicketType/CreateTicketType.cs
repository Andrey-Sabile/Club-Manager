using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.TicketTypes.Commands.CreateTicketType;

public record CreateTicketTypeCommand : IRequest<int>
{
    public int EventId { get; init; }
    
    public required IEnumerable<NewTicketTypeDto>TicketTypes { get; init; }
}

public class CreateTicketTypeCommandHandler : IRequestHandler<CreateTicketTypeCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateTicketTypeCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<int> Handle(CreateTicketTypeCommand request, CancellationToken cancellationToken)
    {
        foreach (var ticketType in request.TicketTypes)
        {
            var entity = new TicketType
            {
                EventId = request.EventId, 
                Name = ticketType.Name, 
                Quantity = ticketType.Quantity, 
                Price = ticketType.Price
            };
            _context.TicketTypes.Add(entity);
        }
        
        await _context.SaveChangesAsync(cancellationToken);
        return request.EventId;
    }
}
