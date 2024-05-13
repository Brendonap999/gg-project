
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GameLobbyApi.Models;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;

namespace GameLobbyApi.Services;

public class UserService
{
    private readonly IMongoCollection<User> _usersCollection;

    public UserService(
        IOptions<GameLobbyDatabaseSettings> gameLobbyDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            gameLobbyDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            gameLobbyDatabaseSettings.Value.DatabaseName);

        _usersCollection = mongoDatabase.GetCollection<User>(
            gameLobbyDatabaseSettings.Value.UsersCollectionName);
    }


    public async Task<User?> GetUser(string id)
    {
        return await _usersCollection.Find(user => user.Id == id).FirstOrDefaultAsync();
    }

    public async Task<User> CreateUser(User user)
    {
        // TODO: does user already exist
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        await _usersCollection.InsertOneAsync(user);

        // TODO: don't return user
        return user;
    }

    public string Authenticate(string email, string password)
    {
        var user = _usersCollection.Find(user => user.Email == email).FirstOrDefault();

        if (user == null)
        {
            return null!;
        }

        if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return null!;
        }

        var securityTokenHandler = new JwtSecurityTokenHandler();

        var tokenKey = Encoding.ASCII.GetBytes("someLongKeyThatShouldBeStoredInEnvironmentVariables");

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new Claim[]{
                new Claim(ClaimTypes.Name, user.Email)
            }),
            Expires = DateTime.UtcNow.AddHours(6),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(tokenKey),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = securityTokenHandler.CreateToken(tokenDescriptor);

        return securityTokenHandler.WriteToken(token);

    }
}