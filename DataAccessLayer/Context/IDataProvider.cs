namespace DataAccessLayer.Context;

public interface IDataProvider
{
    IUnitOfWork GetUnitOfWork();
}