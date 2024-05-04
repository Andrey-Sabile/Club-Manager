using Club_Manager.Application.Common.Interfaces;

namespace Club_Manager.Application.Members.Queries.GetMembers;

public record GetMembersQuery(int ClubId) : IRequest<IList<MemberDto>>;

public class GetMembersQueryHandler : IRequestHandler<GetMembersQuery, IList<MemberDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetMembersQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<MemberDto>> Handle(GetMembersQuery request, CancellationToken cancellationToken)
    {
        return await _context.Members
            .AsNoTracking()
            .Where(c => c.ClubId == request.ClubId)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .ToListAsync(cancellationToken);
    }
}
