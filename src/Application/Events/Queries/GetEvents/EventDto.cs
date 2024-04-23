using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Events.Queries.GetEvents;

public class EventDto
{
    public int Id { get; init; }

    public int ClubId { get; init; }
    
    public string? Name { get; set; }
    
    public DateTimeOffset When { get; set; }
    
    public string? Location { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Event, EventDto>();
        }
    }
}
