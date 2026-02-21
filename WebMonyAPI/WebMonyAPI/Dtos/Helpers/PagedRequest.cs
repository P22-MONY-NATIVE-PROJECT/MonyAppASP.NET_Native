namespace WebMonyAPI.Dtos.Helpers;

public class PagedRequest
{
    public int Page      { get; set; } = 1;
    public int PageSize  { get; set; } = 20;
    public string? OrderBy   { get; set; }
    public bool Descending   { get; set; } = false;
    public bool? IsDeleted   { get; set; } = false;
}
