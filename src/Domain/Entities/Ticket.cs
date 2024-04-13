namespace Club_Manager.Domain.Entities;

public class Ticket : BaseAuditableEntity
{
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Email { get; set; }
    
    public int EventId { get; set; }

    public Event Event { get; set; } = null!;
    
    public int TicketTypeId { get; set; }

    public TicketType TicketType { get; set; } = null!;
}
