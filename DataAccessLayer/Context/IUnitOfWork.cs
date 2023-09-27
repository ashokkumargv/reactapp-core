using DataAccessLayer.Interfaces;

namespace DataAccessLayer.Context;

public interface IUnitOfWork: IDisposable
{
    Task<int> CommitAsync();
    void Rollback();
    IRepository<T> Repository<T>() where T : class;
}