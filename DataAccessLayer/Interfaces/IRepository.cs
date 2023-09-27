using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DataAccessLayer.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(object? id);
    Task<IList<T>> GetAllAsync();
    Task<IList<T>> GetAllIncludingAsync<TProperty>(Expression<Func<T, TProperty>> including);
    Task<EntityEntry<T>> AddAsync(T entity);
    EntityEntry<T> Update(T entity);
    void DeleteAsync<TEntity>(TEntity entity) where TEntity : class;
}