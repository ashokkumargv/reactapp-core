﻿namespace DataAccessLayer.Entities;

public class User
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public int? Age { get; set; }
    public string? Phone { get; set; }
    public string? Access { get; set; }
}