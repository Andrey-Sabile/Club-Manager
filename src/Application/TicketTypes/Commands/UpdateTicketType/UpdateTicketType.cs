namespace Club_Manager.Application.TicketTypes.Commands.UpdateTicketType;

public record UpdateTicketTypeCommand : IRequest
{
    public int Id { get; init; }
}
