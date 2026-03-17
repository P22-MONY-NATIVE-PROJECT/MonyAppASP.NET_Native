using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Dtos.Helpers;

public class Specification<TEntity> : ISpecification<TEntity>
{
    public Specification(Expression<Func<TEntity, bool>>? criteria = null)
    {
        Criteria   = criteria;
        Includes   = new List<Expression<Func<TEntity, object>>>();
        Queryable  = Enumerable.Empty<TEntity>().AsQueryable();
    }

    public Expression<Func<TEntity, bool>>? Criteria { get; private set; }
    public List<Expression<Func<TEntity, object>>> Includes { get; }

    public Expression<Func<TEntity, object>>? OrderBy { get; private set; }
    public Expression<Func<TEntity, object>>? OrderByDescending { get; private set; }

    public IQueryable<TEntity> Queryable { get; set; }

    public Specification<TEntity> ApplyPaging(int page, int pageSize)
    {
        return this;
    }

    public Specification<TEntity> ApplyOrdering(string? propertyName, bool descending)
    {
        return this;
    }
}
