using System.Linq.Expressions;
using DataAccessLayer.Data;
using Microsoft.EntityFrameworkCore;
using DataAccessLayer.Interfaces;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace DataAccessLayer.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly ApplicationDbContext _dbContext;
    private readonly DbSet<T> _dbSet;
    public T GetById(object id)
    {
        return _dbSet.Find(id);
    }
    public Repository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = _dbContext.Set<T>();
    }
    public IList<T> GetAll()
    {
        return _dbSet.ToList();
    }
    public void Add(T entity)
    {
        _dbSet.Add(entity);
    }

    public async Task<T?> GetByIdAsync(object? id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<IList<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<IList<T>> GetAllIncludingAsync<TProperty>(Expression<Func<T, TProperty>> including)
    {
        return await _dbSet.Include(including).ToListAsync();
    }

    public async Task<EntityEntry<T>> AddAsync(T entity)
    {
        return await _dbSet.AddAsync(entity);
    }
    
    public EntityEntry<T> Update(T entity)
    {
        return _dbContext.Set<T>().Entry(entity).State == EntityState.Added ?
            _dbContext.Set<T>().Add(entity) 
            : _dbContext.Set<T>().Update(entity);
        //return  _dbSet.Update(entity);
    }
    
    // <summary>
    /// Adds the specified entity.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <param name="entity">The entity.</param>
    /// <returns></returns>
    public void AddOrUpdate<TEntity>(TEntity entity) where TEntity : class
    {
        if(_dbContext.Set<TEntity>().Entry(entity).State == EntityState.Added)
            _dbContext.Set<TEntity>().Add(entity);
        else
            _dbContext.Set<TEntity>().Update(entity);
        //return Task.CompletedTask;
    }
    
    // <summary>
    /// delete the specified entity.
    /// </summary>
    /// <typeparam name="TEntity">The type of the entity.</typeparam>
    /// <param name="entity">The entity.</param>
    /// <returns></returns>
    public void DeleteAsync<TEntity>(TEntity entity) where TEntity : class
    {
        _dbContext.Set<TEntity>().Remove(entity);
    }
}