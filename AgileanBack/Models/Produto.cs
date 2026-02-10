using System.ComponentModel.DataAnnotations;

namespace AgileanBack.Models;

public class Produto
{
    [Key]
    public int Id{get; set;}

    [Required(ErrorMessage = "O nome é obrigatório")]
    public string Nome {get; set;} = string.Empty;

    public string? Descricao {get; set;}

    [Required]
    public decimal Preco {get; set;}

    [Required]
    public int Estoque {get; set;}

    [Required]
    public string Categoria {get; set;} = string.Empty;

}