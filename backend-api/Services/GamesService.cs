
using GameLobbyApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace GameLobbyApi.Services;

public class GamesService
{
    private readonly IMongoCollection<Game> _gamesCollection;

    public GamesService(
        IOptions<GameLobbyDatabaseSettings> gameLobbyDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            gameLobbyDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            gameLobbyDatabaseSettings.Value.DatabaseName);

        _gamesCollection = mongoDatabase.GetCollection<Game>(
            gameLobbyDatabaseSettings.Value.GamesCollectionName);
    }

    public async Task<List<Game>> GetAllGames(int pageNumber, int pageSize) 
    {
        return await _gamesCollection.Find(_ => true).Skip((pageNumber - 1) * pageSize).Limit(pageSize).ToListAsync();
    }

    public async Task<List<Game>> GetGamesByStudio(string studioName) 
    {
        return await _gamesCollection.Find(game => game.StudioName == studioName).ToListAsync();
    }

    public async Task<List<string>> GetAllDistinctStudios() 
    {
        return await _gamesCollection.Distinct(game => game.StudioName, _ => true).ToListAsync();
    }

    public async Task<Game> GetGameById(string id)
    {
        return await _gamesCollection.Find(game => game.Id == id).FirstOrDefaultAsync();
    }

    public async Task CreateGame(Game newGame)
    {
        await _gamesCollection.InsertOneAsync(newGame);
    }

    public async Task UpdateGame(string id, Game updatedGame)
    {
        await _gamesCollection.ReplaceOneAsync(game => game.Id == id, updatedGame);
    }

    public async Task DeleteGame(string id)
    {
        await _gamesCollection.DeleteOneAsync(game => game.Id == id);
    }
}