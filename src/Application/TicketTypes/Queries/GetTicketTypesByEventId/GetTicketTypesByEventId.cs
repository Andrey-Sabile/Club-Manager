using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.TicketTypes.Queries.GetTicketTypesByEventId;

public record GetTicketTypesByEventIdQuery(int EventId) : IRequest<IList<TicketTypeDto>>;

public class GetTicketTypesByEventIdQueryHandler : IRequestHandler<GetTicketTypesByEventIdQuery, IList<TicketTypeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
    
    public GetTicketTypesByEventIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }


    public async Task<IList<TicketTypeDto>> Handle(GetTicketTypesByEventIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.TicketTypes
            .Where(ticketType => ticketType.EventId == request.EventId)
            .ProjectTo<TicketTypeDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}
