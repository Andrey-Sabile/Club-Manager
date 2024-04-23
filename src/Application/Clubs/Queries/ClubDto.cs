using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Clubs.Queries.GetClubs;

public class ClubDto
{
    public int Id { get; init; }

    public string? Name { get; init; }

    public string? Description { get; init;}

    public string? LogoUrl { get; init; }

    public string? ContactEmail { get; init; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Club, ClubDto>();
        }
    }

}