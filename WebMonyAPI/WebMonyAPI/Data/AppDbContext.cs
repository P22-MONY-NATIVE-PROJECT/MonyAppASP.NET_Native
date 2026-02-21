using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<CategoryTypeEntity> CategoryTypes { get; set; }
    public DbSet<CategoryBaseEntity> Categories { get; set; }
    public DbSet<CurrencyEntity> Currencies { get; set; }
    public DbSet<BalanceEntity> Balances { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
