using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Members.Queries.GetMembers;

public class MemberDto
{
    public int Id { get; init; }

    public int ClubId { get; init; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailAddress { get; set; }

    public Boolean IsFresher { get; set; }
    
    public SubscriptionDto? Subscription { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Member, MemberDto>();
        }
    }
}
