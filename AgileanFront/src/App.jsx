import { useEffect, useState } from 'react'
import api from './services/api'
import ProductCard from './components/ProductCard'

function App() {
  const [produtos, setProdutos] = useState([])

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

      <main className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
          {produtos.length > 0 ? (
            produtos.map(produto => (
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