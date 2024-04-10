using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Events.Queries.GetEvents;

public record GetEventsQuery : IRequest<IList<EventDto>>;

public class GetEventsQueryHandler : IRequestHandler<GetEventsQuery, IList<EventDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEventsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<EventDto>> Handle(GetEventsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Events
            .AsNoTracking()
            .ProjectTo<EventDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}
