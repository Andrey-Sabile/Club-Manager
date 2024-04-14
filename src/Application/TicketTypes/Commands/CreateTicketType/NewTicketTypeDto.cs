namespace Club_Manager.Application.TicketTypes.Commands.CreateTicketType;

public class NewTicketTypeDto
{
    public string? Name { get; init; }
    
    public int Quantity { get; init; }
    
    public decimal Price { get; init; }
}
