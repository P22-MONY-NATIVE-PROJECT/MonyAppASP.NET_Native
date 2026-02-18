using Microsoft.EntityFrameworkCore;
using WebMonyAPI.Entities;

namespace WebMonyAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        // Add other DbSets here (e.g. Transactions, Accounts, …)
    }
}
