using Club_Manager.Application.Common.Interfaces;
using Club_Manager.Domain.Constants;
using Club_Manager.Infrastructure.Data;
using Club_Manager.Infrastructure.Data.Interceptors;
using Club_Manager.Infrastructure.Identity;
using Club_Manager.Infrastructure.Email;
using Club_Manager.Infrastructure.Payments;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Stripe;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        Guard.Against.Null(connectionString, message: "Connection string 'DefaultConnection' not found.");

        var mailgunSettings = configuration.GetSection("MailgunSettings");
        Guard.Against.Null(mailgunSettings, message: "Mailgun settings not found");

        var stripeSettings = configuration.GetSection("StripeSettings");
        Guard.Against.Null(stripeSettings, message: "Stripe settings not found");

        services.AddScoped<ISaveChangesInterceptor, AuditableEntityInterceptor>();
        services.AddScoped<ISaveChangesInterceptor, DispatchDomainEventsInterceptor>();

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            options.AddInterceptors(sp.GetServices<ISaveChangesInterceptor>());

            options.UseNpgsql(connectionString);
        });

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());

        services.AddScoped<ApplicationDbContextInitialiser>();

        services
            .AddDefaultIdentity<ApplicationUser>()
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>();

        services.AddSingleton(TimeProvider.System);
        services.AddTransient<IIdentityService, IdentityService>();

        services.AddAuthorization(options =>
            options.AddPolicy(Policies.CanPurge, policy => policy.RequireRole(Roles.Administrator)));
        
        services
            .AddFluentEmail(mailgunSettings["FluentEmail"])
            .AddMailGunSender(mailgunSettings["Domain"], mailgunSettings["ApiKey"]);
        
        services.AddTransient<IEmailService, EmailService>();

        StripeConfiguration.ApiKey = stripeSettings["SecretKey"];

        services.AddTransient<ICheckoutService, CheckoutService>();
        
        return services;
    }
}
