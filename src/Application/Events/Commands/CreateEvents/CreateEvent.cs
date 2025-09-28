using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Application.TicketTypes.Commands.CreateTicketType;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Events.Commands.CreateEvents;

public record CreateEventCommand : IRequest<int>
{
    public int ClubId { get; init; }

    public string? Name { get; set; }

    public DateTime When { get; set; }

    public string? Location { get; set; }

    public string? Description { get; set; }

    public required IEnumerable<NewTicketTypeDto> TicketTypes { get; init; }
}

public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateEventCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateEventCommand request, CancellationToken cancellationToken)
    {
        var newEvent = new Event
        {
            ClubId = request.ClubId,
            Name = request.Name,
            When = request.When.ToUniversalTime(),
            Location = request.Location,
            Description = request.Description,
        };

        _context.Events.Add(newEvent);
        await _context.SaveChangesAsync(cancellationToken);

        foreach (var ticketType in request.TicketTypes)
        {
            var ticketTypes = new TicketType
            {
                EventId = newEvent.Id,
                Name = ticketType.Name,
                Quantity = ticketType.Quantity,
                Price = ticketType.Price
            };
            _context.TicketTypes.Add(ticketTypes);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return newEvent.Id;
    }
}
