import {useEffect, useState} from 'react';
import api from './services/api';

function App(){
  const [produtos, setProdutos] = useState([])
  const [erro, setErro] = useState(null)

  useEffect(() => {

    async function carregarProdutos(){
      try{
        const response = await api.get('/produtos')
        setProdutos(response.data)
        console.log("Sucesso! Dados recebidos:", response.data)
      } catch (err) {
        setErro(err.message)
        console.error("Erro ao conectar no Back:", err)
      }
    }

    carregarProdutos()
}, [])

return(
  <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-500 mb-8">Agilean System </h1>

      <div className="bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 border-b border-slate-700 pb-2">Status da API</h2>
        
        {erro ? (
          <div className="text-red-400">
            <p className="font-bold"> Erro de Conexão:</p>
            <p className="text-sm bg-red-900/20 p-2 mt-2 rounded">{erro}</p>
          </div>
        ) : produtos.length > 0 ? (
          <div className="text-green-400">
            <p className="text-2xl font-bold"> Conectado!</p>
            <p className="text-slate-300 mt-2">Encontramos **{produtos.length}** produtos no banco.</p>
          </div>
        ) : (
          <div className="text-yellow-400">
            <p className="text-2xl font-bold"> Quase lá...</p>
            <p className="text-slate-300 mt-2">Conectado ao Back-end, mas a tabela de produtos parece vazia.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;