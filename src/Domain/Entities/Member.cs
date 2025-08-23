namespace Club_Manager.Domain.Entities;

public class Member : BaseAuditableEntity
{
    public int ClubId { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailAddress { get; set; }

    public bool IsFresher { get; set; }

    public Subscription? Subscription { get; set; }

    public Club Club { get; set; } = null!;
}