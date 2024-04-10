using Club_Manager.Domain.Entities;

namespace Club_Manager.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }

    DbSet<TodoItem> TodoItems { get; }

    DbSet<Member> Members { get; }

    DbSet<Subscription> Subscriptions { get; }
    
    DbSet<Event> Events { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
