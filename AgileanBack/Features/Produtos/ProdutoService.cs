using Microsoft.EntityFrameworkCore;
using AgileanBack.Infrastructure.Data;

namespace AgileanBack.Features.Produtos;

public class ProdutoService
{
    private readonly AppDbContext _context;

    public ProdutoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Produto>> ListarTodosAsync()
    {
        return await _context.Produtos.ToListAsync();
    }

    public async Task<Produto?> ObterPorIdAsync(int id)
    {
        return await _context.Produtos.FindAsync(id);
    }

    public async Task<Produto> CriarAsync(Produto produto)
    {
        _context.Produtos.Add(produto);
        await _context.SaveChangesAsync();
        return produto;
    }

    public async Task<bool> AtualizarAsync(int id, Produto produto)
    {
        if (id != produto.Id) return false;

        _context.Entry(produto).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
            return true;
        }
        catch
        {
            if (!_context.Produtos.Any(e => e.Id == id))
                return false;

            throw;
        }
    }

    public async Task<bool> RemoverAsync(int id)
    {
        var produto = await _context.Produtos.FindAsync(id);
        if (produto == null) return false;

        _context.Produtos.Remove(produto);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<string>> ListarCategoriasAsync()
    {
        return await _context.Produtos
            .Select(p => p.Categoria)
            .Distinct()
            .ToListAsync();
    }
}
