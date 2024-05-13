using System.Text.Json.Serialization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace GameLobbyApi.Models;

public class Game
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    [JsonIgnore]
    public string? Id { get; set; } = null!;

    [BsonElement("game_title")]
    public string GameTitle { get; set; } = null!;

    [BsonElement("genre")]
    public string Genre { get; set; } = null!;

    [BsonElement("platform")]
    public string Platform { get; set; } = null!;


    [BsonElement("release_date")]
    public string ReleaseDate { get; set; } = null!;


    [BsonElement("rating")]
    public double? Rating { get; set; } = null!;


    [BsonElement("price")]
    public decimal? Price { get; set; } = null!;


    [BsonElement("image_url")]
    public string ImageUrl { get; set; } = null!;


    [BsonElement("description")]
    public string Description { get; set; } = null!;


    [BsonElement("studio_name")]
    public string StudioName { get; set; } = null!;

}