namespace Club_Manager.Application.TicketTypes.Commands.CreateTicketType;

public class CreateTicketTypeCommandValidator : AbstractValidator<CreateTicketTypeCommand>
{
    public CreateTicketTypeCommandValidator()
    {
        RuleFor(ticketType => ticketType.EventId)
            .NotEmpty().WithMessage("Event id must not be empty");
    }
}
