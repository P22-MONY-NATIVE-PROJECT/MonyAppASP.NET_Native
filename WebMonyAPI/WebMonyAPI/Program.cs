using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Додаємо сервіси

builder.Services.AddControllers();


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));

// Додаємо підключення до БД
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

// Налаштовуємо HTTP конвеєр

app.UseAuthorization();

app.MapControllers();

app.Run();
