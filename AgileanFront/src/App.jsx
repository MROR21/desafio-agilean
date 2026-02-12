import { useEffect, useState } from 'react'
import api from './services/api'
import ProductCard from './components/ProductCard'

function App() {
 const [produtos, setProdutos] = useState([]);
 const [busca, setBusca] = useState('');  
 const [categoria, setCategoria] = useState('Todas');
 const listaCategorias = ['Todas', 'Eletrônicos', 'Roupas', 'Alimentos', 'Acessórios', 'Monitores', 'Periféricos'];

 const produtosFiltrados = produtos.filter(p => {
 const matchesBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
 const matchesCategoria = categoria === 'Todas' || p.categoria === categoria;
  return matchesBusca && matchesCategoria;
  });

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const response = await api.get('/produtos')
        setProdutos(response.data)
      } catch (err) {
        console.error("Erro ao carregar:", err)
      }
    }
    carregarProdutos()
  }, [])


return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      <header className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-[28px] font-bold text-[#1F2937]">Catálogo de Produtos</h1>
        <button className="bg-[#3B82F6] hover:bg-blue-600 text-white px-6 py-3 rounded-[8px] font-semibold shadow-sm transition-all flex items-center justify-center gap-2">
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

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {produtosFiltrados.length > 0 ? (
            produtosFiltrados.map(produto => (
              <ProductCard key={produto.id} produto={produto} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-[#6B7280] text-lg">Nenhum produto encontrado no estoque.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App