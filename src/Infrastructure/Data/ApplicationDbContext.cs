using System.Reflection;
using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Entities;
using Club_Manager.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Club_Manager.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();

    public DbSet<TodoItem> TodoItems => Set<TodoItem>();

    public DbSet<Member> Members => Set<Member>();

    public DbSet<Subscription> Subscriptions => Set<Subscription>();

    public DbSet<Event> Events => Set<Event>();

    public DbSet<TicketType> TicketTypes => Set<TicketType>();

    public DbSet<Ticket> Tickets => Set<Ticket>();

    public DbSet<Club> Clubs => Set<Club>();    

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
