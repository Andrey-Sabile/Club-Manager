using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Clubs.Commands.UpdateClub;

public record UpdateClubCommand : IRequest
{
    public int Id { get; init; }
    
    public string? Name { get; init; }

    public string? Description { get; init;}

    public string? LogoUrl { get; init; }

    public string? ContactEmail { get; init; }
}

public class UpdateClubCommandHandler : IRequestHandler<UpdateClubCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateClubCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateClubCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Clubs
            .FindAsync(new object[]{ request.Id }, cancellationToken);
        Guard.Against.NotFound(request.Id, entity);

        entity.Name = request.Name;
        entity.Description = request.Description;
        entity.LogoUrl = request.LogoUrl;
        entity.ContactEmail = request.ContactEmail;

        await _context.SaveChangesAsync(cancellationToken);
    }
}