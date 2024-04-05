using Club_Manager.Application.Common.Interfaces;
using Stripe;
using Stripe.Checkout;

namespace Club_Manager.Infrastructure.Payments;

public class CheckoutService : ICheckoutService
{

    public CheckoutService()
    {
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

        var service = new SessionService();
        var session = await service.CreateAsync(options);

        return session.ClientSecret;
    }
}
