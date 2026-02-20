namespace WebMonyAPI.Dtos.Helpers;

public class PagedResult<T>
{
    public IReadOnlyList<T> Items      { get; set; } = Array.Empty<T>();
    public int               TotalItems { get; set; }
    public int               PageNumber { get; set; }
    public int               PageSize   { get; set; }
}
