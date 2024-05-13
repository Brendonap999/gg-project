namespace backend_api.Models;

public class GameLobbyDatabaseSettings
{
    public string ConnectionString { get; set; } = null!;

    public string DatabaseName { get; set; } = null!;

    public string GamesCollectionName { get; set; } = null!;
    public string UsersCollectionName { get; set; } = null!;
}