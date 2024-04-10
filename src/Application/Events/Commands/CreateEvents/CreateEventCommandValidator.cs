namespace Club_Manager.Application.Events.Commands.CreateEvents;

public class CreateEventCommandValidator : AbstractValidator<CreateEventCommand>
{
    public CreateEventCommandValidator()
    {
        RuleFor(e => e.Name)
            .NotEmpty();

        RuleFor(e => e.Location)
            .NotEmpty();

        RuleFor(e => e.When)
            .NotEmpty();
    }
}
