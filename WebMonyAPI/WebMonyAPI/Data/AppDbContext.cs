using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;

namespace WebMonyAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}

    public DbSet<ExpenseCategoryEntity> ExpenseCategories { get; set; }
    public DbSet<SavingCategoryEntity> SavingCategories { get; set; }
    public DbSet<IncomeCategoryEntity> IncomeCategories { get; set; }
    public DbSet<CurrencyEntity> Currencies { get; set; }
    public DbSet<BalanceEntity> Balances { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
