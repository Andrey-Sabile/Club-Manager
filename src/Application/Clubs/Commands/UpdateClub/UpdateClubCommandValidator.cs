using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Clubs.Commands.UpdateClub;

public class UpdateClubCommandValidator : AbstractValidator<UpdateClubCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateClubCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c.Name)
        .NotEmpty();
                
        RuleFor(c => c.Id)
            .NotEmpty().WithMessage("Club id cannot be empty");
        
        RuleFor(c => c.LogoUrl)
            .NotEmpty();
        
        RuleFor(c => c.Description)
            .NotEmpty();
        
        RuleFor(c => c.ContactEmail)
            .NotEmpty();
    }

    public async Task<bool> BeUniqueName(string? name, CancellationToken cancellationToken)
    {
        return await _context.Clubs
            .AllAsync(c => c.Name != name, cancellationToken);
    }

}