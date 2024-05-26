using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Clubs.Commands.CreateClub;

public record CreateClubCommand : IRequest<int>
{
    public string? Name { get; init; }

    public string? Description { get; init;}

    public string? LogoUrl { get; init; }

    public string? ContactEmail { get; init; }
}

public class CreateClubCommandCommandHandler : IRequestHandler<CreateClubCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateClubCommandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateClubCommand request, CancellationToken cancellationToken)
    {
        var entity = new Club()
        {
            Name = request.Name,
            Description = request.Description,
            LogoUrl = " ",
            ContactEmail = request.ContactEmail,
        };

        _context.Clubs.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}