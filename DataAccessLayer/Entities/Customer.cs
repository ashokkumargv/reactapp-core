namespace DataAccessLayer.Entities;

public class Customer
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? ShortName { get; set; }
    public int? Number { get; set; }
    public string? TaxNumber { get; set; }
    public Address Address { get; set; }
}