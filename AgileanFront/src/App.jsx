import { useEffect, useState } from 'react'
import api from './services/api'
import ProductCard from './components/ProductCard'
import ProductModal from './components/ProductModal';

function App() {
 const [produtos, setProdutos] = useState([]);
 const [busca, setBusca] = useState('');  
 const [categoria, setCategoria] = useState('Todas');
 const [categorias, setCategorias] = useState([]);
 const [disponibilidade, setDisponibilidade] = useState('Todos'); 
 const [ordenacao, setOrdenacao] = useState('recentes');
 const [modalAberto, setModalAberto] = useState(false); 
 const [produtoParaEditar, setProdutoParaEditar] = useState(null);
 const [modalDeleteAberto, setModalDeleteAberto] = useState(false);
 const [produtoParaExcluir, setProdutoParaExcluir] = useState(null);

 function abrirModalCadastro() {
    setProdutoParaEditar(null); 
    setModalAberto(true);
  }

 function abrirEdicao(produto) {
   setProdutoParaEditar(produto);
   setModalAberto(true);
  }

 function prepararExclusao(produto) {
  setProdutoParaExcluir(produto);
  setModalDeleteAberto(true);
} 

async function confirmarExclusao() {
  try {
    await api.delete(`/produtos/${produtoParaExcluir.id}`);
    carregarProdutos();
    setModalDeleteAberto(false); 
    setProdutoParaExcluir(null); 
  } catch (err) {
    console.error(err);
    alert("Erro ao excluir produto.");
  }
}

 async function carregarProdutos() {
      try {
        const response = await api.get('/produtos')
        setProdutos(response.data)
      } catch (err) {
        console.error("Erro ao carregar:", err)
      }
    }

  async function carregarCategorias() {
  const res = await api.get('/produtos/categorias');
  setCategorias(res.data);
  }  

  useEffect(() => { 
    carregarProdutos()
    carregarCategorias()
  }, [])

 const produtosProcessados = produtos
  .filter(p => {
    const matchesBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchesCategoria = categoria === 'Todas' || p.categoria === categoria;
    
    const matchesDisponibilidade =
      disponibilidade === 'Todos' ||
      (disponibilidade === 'disponiveis' && p.ativo && p.estoque >= 10) ||
      (disponibilidade === 'baixo' && p.ativo && p.estoque >= 1 && p.estoque < 10) ||
      (disponibilidade === 'semEstoque' && p.ativo && p.estoque === 0) ||
      (disponibilidade === 'inativos' && !p.ativo);


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
      <div className="flex flex-col lg:flex-row gap-[20px] items-center">

        <input
          type="text"
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="flex-grow p-[12px] border border-[#E5E7EB] rounded-[8px] bg-white text-[#1F2937]"
        />

        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full lg:w-[220px] p-[12px] border border-[#E5E7EB] rounded-[8px] bg-white"
        >
          <option value="Todas">Todas as Categorias</option>
          {categorias.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={disponibilidade}
          onChange={(e) => setDisponibilidade(e.target.value)}
          className="w-full lg:w-[200px] p-[12px] border border-[#E5E7EB] rounded-[8px] bg-white"
        >
          <option value="Todos">Todos</option>
          <option value="disponiveis">Disponíveis</option>
          <option value="baixo">Estoque Baixo</option>
          <option value="semEstoque">Sem Estoque</option>
          <option value="inativos">Inativos</option>
        </select>

        <select
          value={ordenacao}
          onChange={(e) => setOrdenacao(e.target.value)}
          className="w-full lg:w-[200px] p-[12px] border border-[#E5E7EB] rounded-[8px] bg-white"
        >
          <option value="recentes">Mais Recentes</option>
          <option value="nome">Nome</option>
          <option value="preco-menor">Menor Preço</option>
          <option value="preco-maior">Maior Preço</option>
        </select>

      </div>
    </div>

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {produtosProcessados.length > 0 ? (
            produtosProcessados.map(produto => (
              <ProductCard key={produto.id} 
               produto={produto}
               onEditar={() => abrirEdicao(produto)}
               onExcluir={() => prepararExclusao(produto)} 
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

      {modalDeleteAberto && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[12px] w-full max-w-md p-6 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <span className="text-red-600 text-xl">⚠️</span>
              </div>
              <h3 className="text-lg font-bold text-[#1F2937] mb-2">Confirmar Exclusão</h3>
              <p className="text-sm text-[#6B7280] mb-6">
                Tem certeza que deseja excluir o produto <span className="font-bold text-[#1F2937]">"{produtoParaExcluir?.nome}"</span>?
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setModalDeleteAberto(false)}
                className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#374151] rounded-[8px] font-semibold transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarExclusao}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-[8px] font-semibold transition-all shadow-md active:scale-95"
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}

export default App