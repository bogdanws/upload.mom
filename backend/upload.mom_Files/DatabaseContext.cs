using Microsoft.EntityFrameworkCore;
using upload.mom_Files.Models;

namespace upload.mom_Files;

public class DatabaseContext : DbContext
{
    public DbSet<UploadedFile> Files { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }
}