using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WebMonyAPI.Data;
using WebMonyAPI.Interfaces;
using WebMonyAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Додаємо сервіси

builder.Services.AddControllers();
builder.Services.AddScoped<IImageService, ImageService>();

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Додаємо підключення до БД
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Налаштовуємо HTTP конвеєр

app.UseAuthorization();

app.MapControllers();

var dir = builder.Configuration["ImagesDir"];
var path = Path.Combine(Directory.GetCurrentDirectory(), dir!);
Directory.CreateDirectory(path);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = $"/{dir}"
});

app.Run();
