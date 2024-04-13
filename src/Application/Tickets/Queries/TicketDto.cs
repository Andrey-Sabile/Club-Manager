using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Tickets.Queries;

public class TicketDto
{
    public int Id { get; init; }
    
    public int EventId { get; init; }
    
    public string? FirstName { get; set; }
    
    public string? LastName { get; set; }
    
    public string? Email { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Ticket, TicketDto>();
        }
    }
}
