using BusinessLogicLayer.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    // GET
    [HttpGet]
    public async Task<IActionResult> Users()
    {
        var users = await _userService.GetUsersAsync();
        return Ok(users);
    }
}