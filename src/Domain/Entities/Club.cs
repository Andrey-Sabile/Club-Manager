namespace Club_Manager.Domain.Entities;

public class Club : BaseAuditableEntity
{
    public string? Name { get; set; }

    public string? Description { get; set;}

    public string? LogoUrl { get; set; }

    public string? ContactEmail { get; set; }

    public IList<Member> Members { get; private set; } = new List<Member>();

    public IList<Event> Events { get; private set; } = new List<Event>();
}