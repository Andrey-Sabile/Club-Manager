using Club_Manager.Application.TicketTypes.Commands.CreateTicketType;

namespace Club_Manager.Application.Events.Commands.CreateEvents;

public class NewEventDto
{
    public string? Name { get; set; }

    public DateTimeOffset When { get; set; }

    public string? Location { get; set; }
}
