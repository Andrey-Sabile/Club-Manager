namespace Club_Manager.Application.Tickets.Queries.GetTickets;

public class GetTicketsQueryValidator : AbstractValidator<GetTicketsQuery>
{
    public GetTicketsQueryValidator()
    {
        RuleFor(tickets => tickets.EventId)
            .NotEmpty().WithMessage("Event Id is required");
    }
}
