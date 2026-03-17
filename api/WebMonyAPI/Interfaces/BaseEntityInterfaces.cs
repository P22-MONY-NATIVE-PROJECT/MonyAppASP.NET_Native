namespace WebMonyAPI.Interfaces;

/// <summary>
/// Marker for entities that have an image file stored somewhere (e.g. on disk or cloud).
/// </summary>
public interface IHasImage
{
    string? ImageUrl { get; set; }
}

public interface IHasImageUpload
{
    IFormFile? Image { get; set; }
}
