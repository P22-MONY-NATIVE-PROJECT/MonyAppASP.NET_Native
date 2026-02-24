using System.Collections.Generic;
using System.Threading.Tasks;
using WebMonyAPI.Dtos.Helpers;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Interfaces;

public interface IGenericRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>, new()
{
    Task<TEntity?> GetByIdAsync(TKey id, bool isSoft=false);
    Task<IReadOnlyList<TEntity>> ListAllAsync(bool isSoft = false);
    Task<IReadOnlyList<TEntity>> ListAsync(ISpecification<TEntity> spec);
    IQueryable<TEntity> AsQurable(bool isSoft = false);
    Task AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(TKey id);
    Task<int> SaveChangesAsync();
}
