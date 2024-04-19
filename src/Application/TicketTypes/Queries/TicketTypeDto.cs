using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.TicketTypes.Queries;

public class TicketTypeDto
{
    public int Id { get; init; }
    
    public string? Name { get; init; }
    
    public int Quantity { get; init; }
    
    public decimal Price { get; init; }
    
    public int EventId { get; init; }
    
    public DateTimeOffset Created { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<TicketType, TicketTypeDto>();
        }
    }

}
