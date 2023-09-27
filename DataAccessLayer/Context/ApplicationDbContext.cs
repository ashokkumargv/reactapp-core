using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Entities;
using Microsoft.Extensions.Configuration;

namespace DataAccessLayer.Data;
    public class ApplicationDbContext:DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Address> Addresses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appSettings.json")
                    .Build();
                var connectionString = configuration.GetConnectionString("Web");
                optionsBuilder.UseSqlServer(connectionString);
            }
        }
    }