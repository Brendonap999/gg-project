using GameLobbyApi.Models;
using GameLobbyApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace GameLobbyApi.Controllers;

[Authorize]
[ApiController]
[Route("api/games")]
public class GamesController : ControllerBase
{
    private readonly GamesService _gamesService;

    public GamesController(GamesService gamesService)
    {
        _gamesService = gamesService;
    }

    [HttpGet]
    public async Task<List<Game>> Get([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 100)
    {
        return await _gamesService.GetAllGames(pageNumber, pageSize);
    }
    
    [HttpGet("{studio}")]
    public async Task<List<Game>> Get(string studio)
    {
        return await _gamesService.GetGamesByStudio(studio);
    }

    [HttpGet("studios")]
    public async Task<ActionResult<List<string>>> GetStudios()
    {
        return await _gamesService.GetAllDistinctStudios();
    }

    [HttpPost]
    public async Task<ActionResult<Game>> Create(Game newGame)
    {
        await _gamesService.CreateGame(newGame);
        return CreatedAtAction(nameof(Get), new { id = newGame.Id }, newGame);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Game updatedGame)
    {
        var game = await _gamesService.GetGameById(id);

        if (game == null)
        {
            return NotFound();
        }

        updatedGame.Id = game.Id;
        await _gamesService.UpdateGame(id, updatedGame);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var game = await _gamesService.GetGameById(id);

        if (game == null)
        {
            return NotFound();
        }

        await _gamesService.DeleteGame(id);

        return NoContent();
    }
}