namespace Club_Manager.Domain.Entities;

public class Subscription : BaseAuditableEntity 
{
    public Boolean Paid { get; set; }

    public int MemberId { get; set; }

    public Member Member { get; set; } = null!;
}
