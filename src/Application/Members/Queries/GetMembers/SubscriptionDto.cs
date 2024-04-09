using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Members.Queries.GetMembers;

public class SubscriptionDto
{
    public Boolean Paid { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Subscription, SubscriptionDto>();
        }
    }
}
