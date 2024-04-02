using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Members.Queries.GetMembers;

public class MemberDto
{
    public int Id { get; init; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailAddress { get; set; }

    public Boolean IsFresher { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Member, MemberDto>();
        }
    }
}