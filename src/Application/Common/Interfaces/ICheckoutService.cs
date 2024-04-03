namespace Club_Manager.Application.Common.Interfaces;

public interface ICheckoutService
{
    Task<string> CreateCheckoutSession();
}