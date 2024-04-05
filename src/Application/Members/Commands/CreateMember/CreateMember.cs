using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;
using Club_Manager.Domain.Events;

namespace Club_Manager.Application.Members.Commands.CreateMember;

public record CreateMemberCommand : IRequest<string>
{
    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? EmailAddress { get; set; }

    public Boolean IsFresher { get; set; }
}

public class CreateMemberCommandHandler : IRequestHandler<CreateMemberCommand, string>
{
    private readonly IApplicationDbContext _context;
    private readonly ICheckoutService _checkout;
    private readonly TimeProvider _dateTime;

    public CreateMemberCommandHandler(IApplicationDbContext context, TimeProvider dateTime, ICheckoutService checkout)
    {
        _context = context;
        _dateTime = dateTime;
        _checkout = checkout;
    }

    public async Task<string> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
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

        var client_secret = await _checkout.CreateCheckoutSession();

        newMember.AddDomainEvent(new MemberCreatedEvent(newMember));

        var newSubcsription = new Subscription
        {
            Renewed = _dateTime.GetUtcNow(),
            MemberId = newMember.Id
        };
        _context.Subscriptions.Add(newSubcsription);
        await _context.SaveChangesAsync(cancellationToken);

        return client_secret;
    }
}