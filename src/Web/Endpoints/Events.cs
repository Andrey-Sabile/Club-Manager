using Club_Manager.Application.Events.Commands.CreateEvents;
using Club_Manager.Application.Events.Queries.GetEventById;
using Club_Manager.Application.Events.Queries.GetEvents;

namespace Club_Manager.Web.Endpoints;

public class Events : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetEvents)
            .MapGet(GetEventById, "GetEvent/{id}")
            .MapPost(CreateEvents);
    }

    public Task<IList<EventDto>> GetEvents(ISender sender, [AsParameters] GetEventsQuery query)
    {
        return sender.Send(query);
    }

    public Task<EventDto> GetEventById(ISender sender, int id)
    {
        return sender.Send((new GetEventByIdQuery(id)));
    }

    public Task<int> CreateEvents(ISender sender, CreateEventCommand command)
    {
        return sender.Send(command);
    }
}
