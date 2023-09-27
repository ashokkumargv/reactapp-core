namespace BusinessLogicLayer.Models;

public class CustomerModel
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? ShortName { get; set; }
    public int? Number { get; set; }
    public string? TaxNumber { get; set; }
    public AddressModel? Address { get; set; }
}