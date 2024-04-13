namespace Club_Manager.Application.Tickets.Commands.CreateTickets;

public class CreateTicketCommandValidator : AbstractValidator<CreateTicketCommand>
{
    public CreateTicketCommandValidator()
    {
        RuleFor(t => t.Email)
            .NotEmpty();
    }
}
