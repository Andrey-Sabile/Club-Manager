using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.TicketTypes.Commands.CreateTicketType;

public record CreateTicketTypeCommand : IRequest<int>
{
    public string? Name { get; set; }
    
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
    
    public int EventId { get; set; }
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
        var entity = new TicketType
        {
            EventId = request.EventId, 
            Name = request.Name, 
            Quantity = request.Quantity, 
            Price = request.Price
        };

        _context.TicketTypes.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
