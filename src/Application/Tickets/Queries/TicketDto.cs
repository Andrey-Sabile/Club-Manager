using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Tickets.Queries;

public class TicketDto
{
    public int Id { get; init; }
    
    public int EventId { get; init; }
    
    public string? FirstName { get; init; }
    
    public string? LastName { get; init; }
    
    public string? Email { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Ticket, TicketDto>();
        }
    }
}
