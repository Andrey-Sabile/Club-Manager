namespace Club_Manager.Domain.Entities;

public class Member : BaseAuditableEntity
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailAddress { get; set; }

    public Boolean IsFresher { get; set; }

    public Subscription? Subscription { get; set; }
}