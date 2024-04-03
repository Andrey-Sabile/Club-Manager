using Club_Manager.Application.Common.Interfaces;
using Stripe;
using Stripe.Checkout;

namespace Club_Manager.Infrastructure.Payments;

public class CheckoutService : ICheckoutService
{
    private readonly StripeClient _stripeClient;

    public CheckoutService(StripeClient stripeClient)
    {
        _stripeClient = stripeClient;
    }

    public async Task<string> CreateCheckoutSession()
    {
        var options = new SessionCreateOptions
        {
            UiMode = "embedded",
            Mode = "payment",
            ReturnUrl = "https://localhost:44447/sign-up/success",
            LineItems = new List<SessionLineItemOptions>
            {
                new SessionLineItemOptions
                {
                    Price = "price_1P1QwsJe4C1rO3TgBlcVGRN6",
                    Quantity = 1,
                }
            }
        };

        var service = new SessionService(_stripeClient);
        var session = await service.CreateAsync(options);

        return session.Id;
    }
}