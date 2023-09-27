using BusinessLogicLayer.Models;

namespace BusinessLogicLayer.Interfaces;

public interface ICustomerService
{
    Task<IEnumerable<CustomerModel>> GetAllCustomersAsync();
    Task AddCustomersAsync(CustomerModel customer);
    Task UpdateCustomersAsync(CustomerModel customerModel);
    Task DeleteCustomersAsync(int customerId);
}
