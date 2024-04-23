using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Clubs.Queries.GetClubs;

public record GetClubsQuery : IRequest<IList<ClubDto>>;

public class GetClubsQueryHandler : IRequestHandler<GetClubsQuery, IList<ClubDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClubsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<ClubDto>> Handle(GetClubsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Clubs
            .AsNoTracking()
            .ProjectTo<ClubDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}