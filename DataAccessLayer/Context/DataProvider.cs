using Microsoft.Extensions.DependencyInjection;

namespace DataAccessLayer.Context;

public class DataProvider : IDataProvider
{
    private readonly IServiceProvider _provider;

    public DataProvider(IServiceProvider provider)
    {
        _provider = provider;
    }
    
    public IUnitOfWork GetUnitOfWork()
    {
        return _provider.GetService<IUnitOfWork>()!;
    }
}