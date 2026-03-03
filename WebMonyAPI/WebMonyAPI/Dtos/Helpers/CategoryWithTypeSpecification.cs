using System.Linq.Expressions;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Interfaces;

namespace WebMonyAPI.Dtos.Helpers;

public class CategoryWithTypeSpecification : ISpecification<CategoryEntity>
{
    public Expression<Func<CategoryEntity, bool>>? Criteria { get; }

    public List<Expression<Func<CategoryEntity, object>>> Includes { get; } = new();

    public CategoryWithTypeSpecification()
    {
        Includes.Add(x => x.CategoryType!);
    }

    public CategoryWithTypeSpecification(long id) : this()
    {
        Criteria = x => x.Id == id;
    }
}
