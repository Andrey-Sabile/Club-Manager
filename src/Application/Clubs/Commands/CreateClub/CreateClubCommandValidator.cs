using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Clubs.Commands.CreateClub;

public class CreateClubCommandValidator : AbstractValidator<CreateClubCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateClubCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c.Name)
            .NotEmpty()
            .MustAsync(BeUniqueName)
                .WithMessage("'{PropertyName}' must be unique.")
                .WithErrorCode("Unique");

        RuleFor(c => c.ContactEmail)
            .NotEmpty();

        RuleFor(c => c.Description)
            .NotEmpty();
    }

    public async Task<bool> BeUniqueName(string? name, CancellationToken cancellationToken)
    {
        return await _context.Clubs
            .AllAsync(c => c.Name != name, cancellationToken);
    }
}