using Club_Manager.Application.TicketTypes.Commands.CreateTicketType;
using Club_Manager.Application.TicketTypes.Queries;
using Club_Manager.Application.TicketTypes.Queries.GetTicketTypesByEventId;

namespace Club_Manager.Web.Endpoints;

public class TicketTypes : EndpointGroupBase
{

    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetTicketTypesByEventId, "{eventId}")
            .MapPost(CreateTicketType);
    }

    private static Task<IList<TicketTypeDto>> GetTicketTypesByEventId(ISender sender, [AsParameters] GetTicketTypesByEventIdQuery query)
    {
        return sender.Send(query);
    }

    private static Task<int> CreateTicketType(ISender sender, CreateTicketTypeCommand command)
    {
        return sender.Send(command);
    }
}
