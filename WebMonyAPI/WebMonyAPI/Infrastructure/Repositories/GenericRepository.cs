using System;
using System.Collections.Generic;
using System.Linq;

using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Data;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Entities.Base;

namespace WebMonyAPI.Infrastructure.Repositories;

public class GenericRepository<TEntity, TKey>(AppDbContext context, IMapper mapper, IImageService? imageService) :
    IGenericRepository<TEntity, TKey>
    where TEntity : class, IEntity<TKey>, new()
{
    public async Task<TEntity?> GetByIdAsync(TKey id, bool isSoft = false)
    {
        var entity = await context.Set<TEntity>().FindAsync(id);
        return entity!.IsDeleted == isSoft ? entity : null;
    }

    public async Task<IReadOnlyList<TEntity>> ListAllAsync()
    {
        return await context.Set<TEntity>()
            .Where(e => !e.IsDeleted)
            .OrderBy(e => e.Id)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<TEntity>> ListAsync(ISpecification<TEntity> spec)
    {
        if (spec == null) throw new ArgumentNullException(nameof(spec));

        IQueryable<TEntity> query = spec.Includes.Aggregate(
            context.Set<TEntity>().AsQueryable(),
            (current, include) => current.Include(include));

        if (spec.Criteria != null)
            query = query.Where(spec.Criteria);

        query = query.Where(e => !e.IsDeleted);

        query = query.OrderBy(e => e.Id);

        return await query.ToListAsync();
    }

    public async Task AddAsync(TEntity entity)
    {
        if (entity == null) throw new ArgumentNullException(nameof(entity));

        await context.Set<TEntity>().AddAsync(entity);
    }

    public async Task UpdateAsync(TEntity entity)
    {
        if (entity == null) throw new ArgumentNullException(nameof(entity));

        context.Set<TEntity>().Update(entity);
        await context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TKey id)
    {
        var entity = await context.Set<TEntity>().FindAsync(id);
        if (entity == null) return;

        entity.IsDeleted = true;
        await context.SaveChangesAsync();
    }

    public async Task<int> SaveChangesAsync() => await context.SaveChangesAsync();

    protected async Task ReplaceImageAsync(IHasImage entity, IFormFile? newFile)
    {
        if (imageService == null || newFile == null) return;

        if (!string.IsNullOrEmpty(entity.ImageUrl))
            await imageService.DeleteImageAsync(entity.ImageUrl);

        entity.ImageUrl = await imageService.SaveImageAsync(newFile);
    }
}
// using Microsoft.EntityFrameworkCore;
// using WebMonyAPI.Specifications;
// using WebMonyAPI.Data;
// using WebMonyAPI.Interfaces;
// using AutoMapper;

// namespace WebMonyAPI.Repositories;

// public class GenericRepository<TEntity, TKey,
//         TDto, TCreateDto, TUpdateDto>(AppDbContext context, IMapper mapper, IImageService imageService) : IGenericRepository<TEntity, TKey,
//         TDto, TCreateDto, TUpdateDto> where TEntity : class,
//           IEntity<TKey>,
//           new()
// {
//     public async Task<TDto?> GetByIdAsync(TKey id)
//     {
//         return await context.Set<TEntity>().FindAsync(id)
//             .ContinueWith(t => mapper.Map<TDto>(t.Result.FirstOrDefault()));
//     }

//     public async Task<List<TDto>> ListAllAsync()
//     {
//         return await mapper.ProjectTo<TDto>(
//             context.Set<TEntity>
//                .Where(x => !x.IsDeleted)
//                .OrderBy(x => x.Id))
//             .ToListAsync();
//     }

//     public async Task<List<TDto>> ListAsync(ISpecification<TEntity> spec)
//     {
//         var queryableResultWithIncludes = spec.Includes
//             .Aggregate(context.Set<TEntity>().AsQueryable(),
//                 (current, include) => current.Include(include));

//         var result = await queryableResultWithIncludes
//            .Where(x => !x.IsDeleted)
//            .Where(spec.Criteria)
//            .OrderBy(x => x.Id)
//            .ToListAsync();

//         return mapper.ProjectTo<List<TDto>>(result);
//     }

//     public async Task<TDto> AddAsync(TCreateDto model)
//     {
//         var entity = mapper.Map<TEntity>(model);
//         context.Set<TEntity>().AddAsync(entity);
//         await context.SaveChangesAsync();
//         return mapper.Map<TDto>(entity);
//     }

//     // public virtual async Task<TDto> Update(TUpdateDto model)
//     // {
//     //     var entity = mapper.Map<TEntity>(model);
//     //     context.Set<TEntity>().Update(entity);
//     //     await context.SaveChangesAsync();
//     //     return mapper.Map<TDto>(entity);
//     // }

//     public virtual async Task<TDto> UpdateAsync(TUpdateDto model)
//     {
//         var keyProp = typeof(TUpdateDto).GetProperty(nameof(IEntity<TKey>.Id));
//         if (keyProp == null) throw new InvalidOperationException("Update model must contain an Id property.");
//         var id = (TKey)keyProp.GetValue(model)!;

//         var entity = await context.Set<TEntity>().FindAsync(id);

//         if (entity == null) throw new KeyNotFoundException($"Entity of type {typeof(TEntity)} with Id={id} not found.");

//         // Map the incoming changes onto the tracked entity
//         mapper.Map(model, entity);

//         // ---------- IMAGE REPLACEMENT ----------
//         if (imageService != null && entity is IHasImage imgEntity && model is IHasImage imgModel)
//         {
//             if (imgModel.Image != null)
//             {
//                 // delete old image if there was one
//                 if (!string.IsNullOrEmpty(imgEntity.Image))
//                     await imageService.DeleteImageAsync(imgEntity.Image);

//                 imgEntity.Image = await imageService.SaveImageAsync(imgModel.Image);
//             }
//         }

//         await context.SaveChangesAsync();

//         return mapper.Map<TDto>(entity);
//     }

//     public virtual async Task Delete(TKey id)
//     {
//         var entity = await context.Set<TEntity>.FirstOrDefaultAsync(x => x.Id == id);
//         if (entity == null) return;

//         entity.IsDeleted = true;
//         await context.SaveChangesAsync();
//     }
// }
