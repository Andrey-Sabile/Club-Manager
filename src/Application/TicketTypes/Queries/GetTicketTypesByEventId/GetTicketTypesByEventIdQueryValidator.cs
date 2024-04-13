namespace Club_Manager.Application.TicketTypes.Queries.GetTicketTypesByEventId;

public class GetTicketTypesByEventIdQueryValidator : AbstractValidator<GetTicketTypesByEventIdQuery>
{
    public GetTicketTypesByEventIdQueryValidator()
    {
        RuleFor(ticketTypes => ticketTypes.EventId)
            .NotEmpty().WithMessage("Event Id is required");
    }
}
