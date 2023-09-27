using BusinessLogicLayer.Interfaces;
using BusinessLogicLayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class CustomerController : ControllerBase
{
    private readonly ICustomerService _customerService;

    public CustomerController(ICustomerService customerService)
    {
        _customerService = customerService;
    }
    // GET
    [HttpGet]
    public async Task<IActionResult> Customers()
    {
        var customers = await _customerService.GetAllCustomersAsync();
        return Ok(customers);
    }

    [HttpPost("AddCustomer")]
    public async Task<IActionResult> AddCustomer([FromBody] CustomerModel customerModel)
    {
        await _customerService.AddCustomersAsync(customerModel);
        return Ok();
    }
    
    [HttpPost("UpdateCustomer")]
    public async Task<IActionResult> UpdateCustomer([FromBody] CustomerModel customerModel)
    {
        await _customerService.UpdateCustomersAsync(customerModel);
        return Ok();
    }
    
    [HttpDelete("DeleteCustomer/{customerId}")]
    public async Task<IActionResult> DeleteCustomer(int customerId)
    {
        await _customerService.DeleteCustomersAsync(customerId);
        return Ok();
    }
}
