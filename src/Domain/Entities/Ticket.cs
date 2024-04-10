namespace Club_Manager.Domain.Entities;

public class Ticket : BaseAuditableEntity
{
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public int EventId { get; set; }

    public Event Event { get; set; } = null!;
}
