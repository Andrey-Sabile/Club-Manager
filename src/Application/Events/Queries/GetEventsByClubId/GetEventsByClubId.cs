using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Events.Queries.GetEventsByClubId;

public record GetEventsByClubIdQuery(int ClubId) : IRequest<IList<EventDto>>;

public class GetEventsByClubIdQueryHandler : IRequestHandler<GetEventsByClubIdQuery, IList<EventDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEventsByClubIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<EventDto>> Handle(GetEventsByClubIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Events
            .Where(e => e.ClubId == request.ClubId)
            .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}