using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Events.Commands.UpdateEvent;

public record UpdateEventCommand : IRequest
{
    public int Id { get; init; }
    
    public string? Name { get; init; }
    
    public string? Location { get; init; }

    public DateTimeOffset When { get; init; }

    public string? Description { get; init; }
}

public class UpdateEventCommandHandler : IRequestHandler<UpdateEventCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateEventCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    
    public async Task Handle(UpdateEventCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Events
            .FindAsync(new object[]{ request.Id }, cancellationToken);
        Guard.Against.NotFound(request.Id, entity);

        entity.Name = request.Name;
        entity.Location = request.Location;
        entity.When = request.When;
        entity.Description = request.Description;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
