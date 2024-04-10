using Club_Manager.Application.Events.Commands.CreateEvents;
using Microsoft.Extensions.DependencyInjection.Events.Queries.GetEvents;

namespace Club_Manager.Web.Endpoints;

public class Events : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetEvents)
            .MapPost(CreateEvents);
    }

    public Task<IList<EventDto>> GetEvents(ISender sender, [AsParameters] GetEventsQuery query)
    {
        return sender.Send(query);
    }

    public Task<int> CreateEvents(ISender sender, CreateEventCommand command)
    {
        return sender.Send(command);
    }
}
