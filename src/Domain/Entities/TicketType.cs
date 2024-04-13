namespace Club_Manager.Domain.Entities;

public class TicketType : BaseAuditableEntity
{
    public string? Name { get; set; }
    
    public int Quantity { get; set; }
    
    public decimal Price { get; set; }
    
    public int EventId { get; set; }

    public Event Event { get; set; } = null!;

    public IList<Ticket> Tickets { get; private set; } = new List<Ticket>();
}
