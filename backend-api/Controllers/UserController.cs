using backend_api.Models;
using backend_api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend_api.Controllers;

[Authorize]
[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserService _userService;

    public AuthController(UserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
    [Route("register")]
    [HttpPost]
    public async Task<ActionResult<User>> Create(User user)
    {
        await _userService.CreateUser(user);
        return Ok(new { user });
    }

    [AllowAnonymous]
    [Route("login")]
    [HttpPost]
    public ActionResult<string> Login(User user)
    {
        var token = _userService.Authenticate(user.Email, user.Password);

        if (token == null)
        {
            return Unauthorized();
        }

        return Ok(new { token, user });
    }
}