using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Members.Commands.CreateMember;

public class CreateMemberCommandValidator : AbstractValidator<CreateMemberCommand>
{
    private readonly IApplicationDbContext _context;

    public CreateMemberCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(m => m.EmailAddress)
            .NotEmpty()
            .MustAsync(BeUniqueEmail)
                .WithMessage("'{PropertyName}' must be unique.")
                .WithErrorCode("Unique");
    }

    public async Task<bool> BeUniqueEmail(string? emailAddress, CancellationToken cancellationToken)
    {
        return await _context.Members
            .AllAsync(m => m.EmailAddress != emailAddress, cancellationToken);
    }
}