using Club_Manager.Application.Events.Commands.CreateEvents;
using Club_Manager.Application.Events.Commands.UpdateEvent;
using Club_Manager.Application.Events.Queries.GetEventById;
using Club_Manager.Application.Events.Queries.GetEvents;
using Club_Manager.Application.Events.Queries;
using Club_Manager.Application.Events.Queries.GetEventsByClubId;

namespace Club_Manager.Web.Endpoints;

public class Events : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetEvents)
            .MapGet(GetEventById, "GetEvent/{id}")
            .MapGet(GetEventsByClubId, "{clubId}")
            .MapPost(CreateEvents)
            .MapPut(UpdateEvent, "{id}");
    }

    private static Task<IList<EventDto>> GetEvents(ISender sender, [AsParameters] GetEventsQuery query)
    {
        return sender.Send(query);
    }

    private static Task<EventDto> GetEventById(ISender sender, int id)
    {
        return sender.Send((new GetEventByIdQuery(id)));
    }

    private static Task<IList<EventDto>> GetEventsByClubId(ISender sender, int clubId)
    {
        return sender.Send(new GetEventsByClubIdQuery(clubId));
    }

    private static Task<int> CreateEvents(ISender sender, CreateEventCommand command)
    {
        return sender.Send(command);
    }

    private async Task<IResult> UpdateEvent(ISender sender, int id, UpdateEventCommand command)
    {
        if (id != command.Id)
        {
            return Results.BadRequest();
        }

        await sender.Send(command);
        return Results.NoContent();
    }
}
