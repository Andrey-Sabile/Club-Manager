using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Tickets.Queries.GetTickets;

public class GetTicketsQuery : IRequest<IList<TicketDto>>
{
    public int EventId { get; init; }
}

public class GetTicketsQueryHandler : IRequestHandler<GetTicketsQuery, IList<TicketDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;
   
    public GetTicketsQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<TicketDto>> Handle(GetTicketsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Tickets
            .Where(ticket => ticket.EventId == request.EventId)
            .ProjectTo<TicketDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}
