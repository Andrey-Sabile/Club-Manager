namespace Club_Manager.Domain.Events;

public class MemberCreatedEvent : BaseEvent
{
    public MemberCreatedEvent(Member member)
    {
        Member = member;
    }

    public Member Member { get; }
}