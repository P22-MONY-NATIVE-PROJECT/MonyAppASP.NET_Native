using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;

namespace WebMonyAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<ExpenseCategoryEntity> ExpenseCategories { get; set; }
    public DbSet<SavingCategoryEntity> SavingCategories { get; set; }
    public DbSet<IncomeCategoryEntity> IncomeCategories { get; set; }
    public DbSet<CurrencyEntity> Currencies { get; set; }
    public DbSet<BalanceEntity> Balances { get; set; }
    public DbSet<ExpenseOperationEntity> ExpenseOperations { get; set; }
    public DbSet<IncomeOperationEntity> IncomeOperations { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<ExpenseOperationEntity>()
           .OwnsMany(o => o.Charges, cb =>
           {
               cb.ToTable("tbl_expense_operation_charges");
               cb.WithOwner().HasForeignKey("OperationId");
               cb.Property(c => c.Amount).HasPrecision(18, 4);
               cb.Property(c => c.Percentage).HasPrecision(5, 2);
           });

        modelBuilder.Entity<IncomeOperationEntity>()
            .OwnsMany(o => o.Charges, cb =>
            {
                cb.ToTable("tbl_income_operation_charges");
                cb.WithOwner().HasForeignKey("OperationId");
                cb.Property(c => c.Amount).HasPrecision(18, 4);
                cb.Property(c => c.Percentage).HasPrecision(5, 2);
            });
    }

}
