namespace Club_Manager.Domain.Entities;

public class Event : BaseAuditableEntity
{
    public string? Name { get; set; }

    public DateTimeOffset When { get; set; }

    public string? Location { get; set; }

    public IList<Ticket> Tickets { get; private set; } = new List<Ticket>();
    
    public IList<TicketType> TicketTypes { get; private set; } = new List<TicketType>();
}
