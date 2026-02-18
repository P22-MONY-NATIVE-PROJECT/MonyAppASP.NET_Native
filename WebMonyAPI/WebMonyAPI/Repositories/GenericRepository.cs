using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Specifications;
using WebMonyAPI.Data;

namespace WebMonyAPI.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly ApplicationDbContext _dbContext;
    protected readonly DbSet<T> _dbSet;

    public GenericRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<T>();
    }

    public async Task<T?> GetByIdAsync(Guid id) =>
        await _dbSet.FindAsync(id);

    public async Task<IReadOnlyList<T>> ListAllAsync() =>
        await _dbSet.ToListAsync();

    public async Task<IReadOnlyList<T>> ListAsync(ISpecification<T> spec)
    {
        var queryableResultWithIncludes = spec.Includes
            .Aggregate(_dbSet.AsQueryable(),
                (current, include) => current.Include(include));

        var result = await queryableResultWithIncludes
            .Where(spec.Criteria)
            .ToListAsync();

        return result;
    }

    public async Task AddAsync(T entity) =>
        await _dbSet.AddAsync(entity);

    public void Update(T entity) =>
        _dbSet.Update(entity);

    public void Delete(T entity) =>
        _dbSet.Remove(entity);

    public async Task<int> SaveChangesAsync() =>
        await _dbContext.SaveChangesAsync();
}
