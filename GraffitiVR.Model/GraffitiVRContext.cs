

using Microsoft.EntityFrameworkCore;

namespace GraffitiVR.Model
{

    public class GraffitiVRContext : DbContext
    {
        public DbSet<Sketch> Sketches { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=graffiti_vr.db");
        }
    }

}