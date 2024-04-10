using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Application.Events.Queries.GetEvents;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Events.Queries.GetEventById;

public record GetEventByIdQuery(int Id) : IRequest<EventDto>;

public class GetEventByIdQueryHandler : IRequestHandler<GetEventByIdQuery, EventDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetEventByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<EventDto> Handle(GetEventByIdQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.Events
            .SingleAsync(e => e.Id == request.Id, cancellationToken);
        Guard.Against.NotFound(request.Id, entity);

        return _mapper.Map<Event, EventDto>(entity);
    }
}
