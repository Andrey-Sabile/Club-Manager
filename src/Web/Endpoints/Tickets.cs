using Club_Manager.Application.Tickets.Commands.CreateTicket;
using Club_Manager.Application.Tickets.Queries;
using Club_Manager.Application.Tickets.Queries.GetTicketById;
using Club_Manager.Application.Tickets.Queries.GetTickets;
using Club_Manager.Application.Tickets.Queries.GetTicketsSold;

namespace Club_Manager.Web.Endpoints;

public class Tickets : EndpointGroupBase
{

    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetTickets)
            .MapGet(GetTicketById, "{id}")
            .MapGet(GetTicketsSold,"sold/{eventId}")
            .MapPost(CreateTicket);
    }

    private static Task<IList<TicketDto>> GetTickets(ISender sender, [AsParameters] GetTicketsQuery query)
    {
        return sender.Send(query);
    }

    private static Task<TicketDto> GetTicketById(ISender sender, int id)
    {
        return sender.Send(new GetTicketByIdQuery(id));
    }

    private static async Task<SoldTicketsDto> GetTicketsSold(ISender sender, int eventId)
    {
        return await sender.Send(new GetTicketsSoldQuery(eventId));
    }

    private static Task<int> CreateTicket(ISender sender, CreateTicketCommand command)
    {
        return sender.Send(command);
    }
}
