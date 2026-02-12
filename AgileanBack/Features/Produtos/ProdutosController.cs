using Microsoft.AspNetCore.Mvc;

namespace AgileanBack.Features.Produtos;

[Route("api/[controller]")]
[ApiController]
public class ProdutosController : ControllerBase
{
    private readonly ProdutoService _service;

    public ProdutosController(ProdutoService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
    {
        return Ok(await _service.ListarTodosAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Produto>> GetProduto(int id)
    {
        var produto = await _service.ObterPorIdAsync(id);
        if (produto == null) return NotFound();

        return Ok(produto);
    }

    [HttpPost]
    public async Task<ActionResult<Produto>> PostProduto(Produto produto)
    {
        var novoProduto = await _service.CriarAsync(produto);
        return CreatedAtAction(nameof(GetProduto), new { id = novoProduto.Id }, novoProduto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduto(int id, Produto produto)
    {
        var atualizado = await _service.AtualizarAsync(id, produto);
        if (!atualizado) return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduto(int id)
    {
        var removido = await _service.RemoverAsync(id);
        if (!removido) return NotFound();

        return NoContent();
    }

    [HttpGet("categorias")]
    public async Task<ActionResult<IEnumerable<string>>> GetCategorias()
    {
        return Ok(await _service.ListarCategoriasAsync());
    }
}
