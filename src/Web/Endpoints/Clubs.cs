
using Club_Manager.Application.Clubs.Commands.CreateClub;
using Club_Manager.Application.Clubs.Commands.UpdateClub;
using Club_Manager.Application.Clubs.Queries.GetClubById;
using Club_Manager.Application.Clubs.Queries.GetClubs;

namespace Club_Manager.Web.Endpoints;

public class Clubs : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetClubs)
            .MapGet(GetClubById, "GetClub/{id}")
            .MapPost(CreateClub)
            .MapPut(UpdateClub, "{id}");
    }

    private static Task<IList<ClubDto>> GetClubs(ISender sender, [AsParameters] GetClubsQuery query)
    {
        return sender.Send(query);
    }

    private static Task<ClubDto> GetClubById(ISender sender, int id)
    {
        return sender.Send((new GetClubByIdQuery(id)));
    }

    private static Task<int> CreateClub(ISender sender, CreateClubCommand command)
    {
        return sender.Send(command);
    }

    private static async Task<IResult> UpdateClub(ISender sender, int id, UpdateClubCommand command)
    {
        if (id != command.Id)
        {
            return Results.BadRequest();
        }

        await sender.Send(command);
        return Results.NoContent();
    }
}
