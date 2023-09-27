namespace DataAccessLayer.Entities;

public class Address
{
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public string? StreetAndNumber { get; set; }
    public string? Zip { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
}