using Club_Manager.Application.Clubs.Queries.GetClubs;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Events.Queries;

public class EventDto
{
    public required ClubDto Club{ get; init;}

    public int Id { get; init; }
    
    public string? Name { get; set; }
    
    public DateTimeOffset When { get; set; }
    
    public string? Location { get; set; }

    public string? Description { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Event, EventDto>().IncludeMembers(e => e.Club);
            CreateMap<Club, EventDto>();
        }
    }
}
