using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;


namespace Club_Manager.Application.Tickets.Queries.GetTicketById;

public record GetTicketByIdQuery(int Id) : IRequest<TicketDto>;

public class GetTicketByIdQueryHandler : IRequestHandler<GetTicketByIdQuery, TicketDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTicketByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<TicketDto> Handle(GetTicketByIdQuery request, CancellationToken cancellationToken)
    {
        var ticket = await _context.Tickets
            .SingleAsync(ticket => ticket.Id == request.Id, cancellationToken: cancellationToken);
        Guard.Against.NotFound(request.Id, ticket);

        return _mapper.Map<Ticket, TicketDto>(ticket);
    }
}
