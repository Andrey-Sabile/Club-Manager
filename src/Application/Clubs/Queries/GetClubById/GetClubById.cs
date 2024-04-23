using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Application.Clubs.Queries.GetClubs;
using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Clubs.Queries.GetClubById;

public record GetClubByIdQuery(int Id) : IRequest<ClubDto>;

public class GetClubByIdQueryHandler : IRequestHandler<GetClubByIdQuery, ClubDto>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetClubByIdQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<ClubDto> Handle(GetClubByIdQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.Clubs
            .SingleAsync(c => c.Id == request.Id, cancellationToken);
        Guard.Against.NotFound(request.Id, entity);

        return _mapper.Map<Club, ClubDto>(entity);
    }
}