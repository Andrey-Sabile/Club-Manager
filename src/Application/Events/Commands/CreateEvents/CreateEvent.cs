using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Events.Commands.CreateEvents;

public record CreateEventCommand : IRequest<int>
{
    public string? Name { get; set; }

    public DateTimeOffset When { get; set; }

    public string? Location { get; set; }
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
        var entity = new Event
        {
            Name = request.Name, When = request.When, Location = request.Location
        };
        _context.Events.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
