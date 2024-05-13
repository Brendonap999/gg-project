using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend_api.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore]
    public string? Id { get; set; }

    [BsonElement("email")] public string Email { get; set; } = null!;

    [BsonElement("password")] public string Password { get; set; } = null!;
}