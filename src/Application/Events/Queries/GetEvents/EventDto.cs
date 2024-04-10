using Club_Manager.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Events.Queries.GetEvents;

public class EventDto
{
    public int Id { get; init; }
    
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
