using Microsoft.EntityFrameworkCore;
using AgileanBack.Features.Produtos;

namespace AgileanBack.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Produto> Produtos {get; set;}
}
    