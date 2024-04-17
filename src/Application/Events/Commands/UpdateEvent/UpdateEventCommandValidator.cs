namespace Club_Manager.Application.Events.Commands.UpdateEvent;

public class UpdateEventCommandValidator : AbstractValidator<UpdateEventCommand>
{
    public UpdateEventCommandValidator()
    {
        RuleFor(e => e.Id)
            .NotEmpty().WithMessage("Event Id cannot be empty");
        
        RuleFor(e => e.Name)
            .NotEmpty();

        RuleFor(e => e.Location)
            .NotEmpty();

        RuleFor(e => e.When)
            .NotEmpty();
    }
}
