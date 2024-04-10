using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;
using Club_Manager.Domain.Events;

namespace Club_Manager.Application.Members.Commands.CreateMember;

public record CreateMemberCommand : IRequest<int>
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailAddress { get; set; }

    public Boolean IsFresher { get; set; }
}

public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateMemberCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
    {
        var newMember = new Member
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            EmailAddress = request.EmailAddress,
            IsFresher = request.IsFresher
        };
        _context.Members.Add(newMember);
        await _context.SaveChangesAsync(cancellationToken);
        newMember.AddDomainEvent(new MemberCreatedEvent(newMember));

        var newSubcsription = new Subscription
        {
            Paid = false,
            MemberId = newMember.Id
        };
        _context.Subscriptions.Add(newSubcsription);
        await _context.SaveChangesAsync(cancellationToken);

        return newMember.Id;
    }
}
