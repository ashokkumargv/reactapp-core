using Microsoft.Extensions.DependencyInjection;
using BusinessLogicLayer.Services;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Context;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Repositories;

namespace BusinessLogicLayer;

public class BusinessLogicModule
{
    public static void Configure(IServiceCollection serviceCollection)
    {
        serviceCollection.AddTransient<IUnitOfWork, UnitOfWork>();
        serviceCollection.AddScoped<IDataProvider, DataProvider>();
        serviceCollection.AddScoped<IUserRepository, UserRepository>();
        serviceCollection.AddScoped<IUserService, UserService>();
        serviceCollection.AddScoped<ICustomerRepository, CustomerRepository>();
        serviceCollection.AddScoped<ICustomerService, CustomerService>();
    }
}