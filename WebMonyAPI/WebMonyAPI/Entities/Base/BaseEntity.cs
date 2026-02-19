using System.ComponentModel.DataAnnotations;

namespace WebMonyAPI.Entities.Base;

public interface IEntity<T>
{
    T Id { get; set; }
    bool IsDeleted { get; set; }
    DateTime DateCreated { get; set; }
}

public abstract class BaseEntity<T> : IEntity<T>
{
    [Key]
    public T Id { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime DateCreated { get; set; } = DateTime.SpecifyKind(DateTime.Now, DateTimeKind.Utc);
}
