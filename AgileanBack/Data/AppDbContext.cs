using Microsoft.EntityFrameworkCore;
using AgileanBack.Models;

namespace AgileanBack.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Produto> Produtos {get; set;}
}
    