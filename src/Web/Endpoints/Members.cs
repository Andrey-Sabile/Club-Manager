using Club_Manager.Application.Members.Commands.CreateMember;
using Club_Manager.Application.Members.Queries.GetMembers;

namespace Club_Manager.Web.Endpoints;

public class Members : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetMembers)
            .MapPost(CreateMember);
    }

    public Task<IList<MemberDto>> GetMembers(ISender sender, [AsParameters] GetMembersQuery query)
    {
        return sender.Send(query);
    }

    public Task<int> CreateMember(ISender sender, CreateMemberCommand command)
    {
        return sender.Send(command);
    }

}
