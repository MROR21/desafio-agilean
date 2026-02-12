import { useEffect, useState } from 'react'
import api from './services/api'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal';

function App() {
 const [produtos, setProdutos] = useState([]);
 const [busca, setBusca] = useState('');  
 const [categoria, setCategoria] = useState('Todas');
 const [disponibilidade, setDisponibilidade] = useState('Todos'); 
 const [ordenacao, setOrdenacao] = useState('recentes');
 const [modalAberto, setModalAberto] = useState(false); 
 const [produtoParaEditar, setProdutoParaEditar] = useState(null);

 const listaCategorias = ['Todas', 'Eletrônicos', 'Roupas', 'Alimentos', 'Acessórios', 'Monitores', 'Periféricos'];

 function abrirModalCadastro() {
    setProdutoParaEditar(null); 
    setModalAberto(true);
  }

 function abrirEdicao(produto) {
   setProdutoParaEditar(produto);
   setModalAberto(true);
  }

 function fecharModal() {
   setModalAberto(false);
   setProdutoParaEditar(null);
  }

 async function carregarProdutos() {
      try {
        const response = await api.get('/produtos')
        setProdutos(response.data)
      } catch (err) {
        console.error("Erro ao carregar:", err)
      }
    }
    
  useEffect(() => { 
    carregarProdutos()
  }, [])

 const produtosProcessados = produtos
  .filter(p => {
    const matchesBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchesCategoria = categoria === 'Todas' || p.categoria === categoria;
    
    const matchesDisponibilidade = 
      disponibilidade === 'Todos' ||
      (disponibilidade === 'disponiveis' && p.estoque > 0 && p.ativo === true) ||
      (disponibilidade === 'semEstoque' && (p.estoque === 0 || p.ativo ===false));

    return matchesBusca && matchesCategoria && matchesDisponibilidade;
  })
  .sort((a, b) => {
    if (ordenacao === 'preco-menor') return a.preco - b.preco;
    if (ordenacao === 'preco-maior') return b.preco - a.preco;
    if (ordenacao === 'nome') return a.nome.localeCompare(b.nome);
    if (ordenacao === 'recentes') return new Date(b.dataCadastro) - new Date(a.dataCadastro);
    return 0;
  });


return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <header className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-[28px] font-bold text-[#1F2937]">Catálogo de Produtos</h1>
        <button 
        onClick={abrirModalCadastro}
        className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-3 rounded-[8px] font-semibold shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <span>+</span> Novo Produto
        </button>
      </header>

    <div className="max-w-7xl mx-auto px-4 mb-8">
      <div className="flex flex-col md:flex-row gap-[20px]">
        <div className="flex-grow">
          <input 
            type="text"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full p-[12px] border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] bg-white text-[#1F2937]"
          />
        </div>

        <div className="w-full md:w-[250px]">
          <select 
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full p-[12px] border border-[#E5E7EB] rounded-[8px] focus:outline-none focus:border-[#3B82F6] bg-white text-[#1F2937] appearance-none"
          >
            <option value="Todas">Todas as Categorias</option>
            {listaCategorias.filter(c => c !== 'Todas').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>

    <select 
      value={disponibilidade}
      onChange={(e) => setDisponibilidade(e.target.value)}
      className="p-[12px] border border-[#E5E7EB] rounded-[8px] bg-white text-[#1F2937] focus:outline-none"
   >
      <option value="Todos">Todos os Status</option>
      <option value="disponiveis">Disponíveis</option>
      <option value="semEstoque">Sem Estoque</option>
    </select>

    <select 
      value={ordenacao}
      onChange={(e) => setOrdenacao(e.target.value)}
      className="p-[12px] border border-[#E5E7EB] rounded-[8px] bg-white text-[#1F2937] focus:outline-none"
    >
      <option value="recentes">Mais Recentes</option>
      <option value="nome">Nome (A-Z)</option>
      <option value="preco-menor">Menor Preço</option>
      <option value="preco-maior">Maior Preço</option>
    </select>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {produtosProcessados.length > 0 ? (
            produtosProcessados.map(produto => (
              <ProductCard key={produto.id} 
               produto={produto}
               onEditar={() => abrirEdicao(produto)}
               onExcluir={() => carregarProdutos()} 
              />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-[#6B7280] text-lg">Nenhum produto encontrado no estoque.</p>
            </div>
          )}
        </div>
      </main>
      <ProductModal 
        isOpen={modalAberto} 
        onClose={() => setModalAberto(false)} 
        onSucesso={carregarProdutos}
        produtoEdicao={produtoParaEditar} 
      />
    </div>
  )
}

export default App