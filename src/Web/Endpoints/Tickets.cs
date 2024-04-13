using Club_Manager.Application.Tickets.Commands.CreateTickets;
using Club_Manager.Application.Tickets.Queries;
using Club_Manager.Application.Tickets.Queries.GetTicketById;
using Club_Manager.Application.Tickets.Queries.GetTickets;

namespace Club_Manager.Web.Endpoints;

public class Tickets : EndpointGroupBase
{

    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetTickets)
            .MapGet(GetTicketById, "{id}")
            .MapPost(CreateTicket);
    }

    public Task<IList<TicketDto>> GetTickets(ISender sender, [AsParameters] GetTicketsQuery command)
    {
        return sender.Send(command);
    }

    public Task<TicketDto> GetTicketById(ISender sender, int id)
    {
        return sender.Send(new GetTicketByIdQuery(id));
    }

    public Task<int> CreateTicket(ISender sender, CreateTicketCommand command)
    {
        return sender.Send(command);
    }
}
