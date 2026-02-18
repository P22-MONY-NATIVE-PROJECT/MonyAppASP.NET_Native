using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Entities.Categories;

namespace WebMonyAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<ExpenseCategoryEntity> ExpenseCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
