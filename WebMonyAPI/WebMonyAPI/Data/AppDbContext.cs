using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Entities.Categories;
using WebMonyAPI.Entities.Finances;
using WebMonyAPI.Entities.Operations;
using WebMonyAPI.Entities.Identity;

namespace WebMonyAPI.Data;

public class AppDbContext : IdentityDbContext<
    UserEntity,
    RoleEntity,
    long,
    IdentityUserClaim<long>,
    UserRoleEntity,
    IdentityUserLogin<long>,
    IdentityRoleClaim<long>,
    IdentityUserToken<long>>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<CategoryTypeEntity> CategoryTypes { get; set; }
    public DbSet<CategoryEntity> Categories { get; set; }

    public DbSet<ExpenseCategoryEntity> ExpenseCategories { get; set; }
    public DbSet<SavingCategoryEntity> SavingCategories { get; set; }
    public DbSet<IncomeCategoryEntity> IncomeCategories { get; set; }
    public DbSet<CurrencyEntity> Currencies { get; set; }
    public DbSet<BalanceEntity> Balances { get; set; }
    public DbSet<OperationEntity> Operations { get; set; }
    public DbSet<OperationChargeEntity> OperationCharges { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<OperationChargeEntity>()
            .HasIndex(c => new { c.OperationId, c.Type })
            .IsUnique();

        modelBuilder.Entity<OperationEntity>()
            .Property(x => x.InitAmount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<OperationEntity>()
            .Property(x => x.CalcAmount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<OperationChargeEntity>()
            .Property(x => x.Amount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<OperationChargeEntity>()
            .Property(x => x.Percentage)
            .HasPrecision(5, 2);

        modelBuilder.Entity<UserRoleEntity>(ur =>
        {
            ur.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();

            ur.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(u => u.UserId)
                .IsRequired();
        });
    }

}
