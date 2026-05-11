using Microsoft.EntityFrameworkCore;
using skincare.api.Models;

namespace skincare.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<SkinAnalysis> SkinAnalyses { get; set; }

        public DbSet<Routine> Routines { get; set; }

        public DbSet<ProductConflict> ProductConflicts { get; set; }
    }
}