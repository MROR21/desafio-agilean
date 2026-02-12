import { useState, useEffect } from 'react';
import api from '../../../api/api';


const ProductModal = ({ isOpen, onClose, onSucesso, produtoEdicao }) => {

  const [erros, setErros] = useState({});
  const [formData, setFormData] = useState({
    nome: '', descricao: '', preco: '', estoque: '', categoria: '', imagemUrl: '', ativo: true
  });

 useEffect(() => {
    if (isOpen) {
      if (produtoEdicao) {
        setFormData(produtoEdicao);
      } else {
        setFormData({
          nome: '', descricao: '', preco: '', estoque: '', categoria: '', imagemUrl: '', ativo: true
        });
      }
      setErros({});
    }
  }, [isOpen, produtoEdicao]);

  if (!isOpen) return null;

  

  const validar = () => {
    let novosErros = {};

    if (!formData.nome.trim()) novosErros.nome = "O nome é obrigatório.";
    if (formData.nome.length > 100) novosErros.nome = "Máximo de 100 caracteres.";
    if (formData.descricao && formData.descricao.length > 500) novosErros.descricao = "Máximo de 500 caracteres.";
    if (!formData.categoria) novosErros.categoria = "Selecione uma categoria.";
    if (!formData.preco || Number(formData.preco) <= 0) novosErros.preco = "O preço deve ser maior que zero.";
    if (formData.estoque === '' || Number(formData.estoque) < 0) novosErros.estoque = "O estoque não pode ser negativo.";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validar()) return;

    const payload = {
        ...formData,
        preco: Number(formData.preco),
        estoque: Number(formData.estoque),
    };

    try {
        if (produtoEdicao) {
        await api.put(`/produtos/${produtoEdicao.id}`, payload);
        } else {
        await api.post('/produtos', payload);
        }
        onSucesso();
        onClose();
    } catch (err) {
        console.error(err);
        alert("Erro ao salvar produto no servidor.");
    }
    };


  return (
    <div 
       onClick={onClose}
       className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"   
    >
      <div 
       onClick={(e) => e.stopPropagation()}
       className="bg-white rounded-[12px] w-full max-w-lg p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
     >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[24px] font-bold text-[#1F2937]">
            {produtoEdicao ? "Editar Produto" : "Novo Produto"}
          </h2>
          <button onClick={onClose} className="text-[#6B7280] hover:text-black">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1">
              Nome *
            </label>
            <input
              required
              placeholder="Ex: Notebook Gamer Nitro 5"
              className={`w-full p-3 border rounded-[8px] outline-none
                ${erros.nome ? 'border-red-500' : 'border-[#E5E7EB]'}
                focus:border-[#3B82F6]`}
              value={formData.nome}
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
            />
            {erros.nome && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {erros.nome}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1">
              Descrição
            </label>
            <textarea
              rows="3"
              placeholder="Ex: Descreva o Produto..."
              className={`w-full p-3 border rounded-[8px] outline-none
                ${erros.descricao ? 'border-red-500' : 'border-[#E5E7EB]'}
                focus:border-[#3B82F6]`}
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
            />
            {erros.descricao && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {erros.descricao}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1">
                Preço (R$) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                placeholder="0,00"
                className={`w-full p-3 border rounded-[8px] outline-none
                ${erros.preco ? 'border-red-500' : 'border-[#E5E7EB]'}
                focus:border-[#3B82F6]`}
                value={formData.preco}
                onChange={(e) => {
                   setFormData({ ...formData, preco: e.target.value })
                }}
              />
              {erros.preco && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {erros.preco}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1">
                Estoque *
              </label>
              <input
                type="number"
                required
                placeholder="0"
                className={`w-full p-3 border rounded-[8px] outline-none
                ${erros.estoque ? 'border-red-500' : 'border-[#E5E7EB]'}
                focus:border-[#3B82F6]`}
                value={formData.estoque}
                onChange={(e) =>
                  setFormData({ ...formData, estoque: e.target.value })
                }
              />
              {erros.estoque && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {erros.estoque}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1">
              Categoria *
            </label>
            <select
            required
              className={`w-full p-3 border rounded-[8px] outline-none
                ${erros.categoria ? 'border-red-500' : 'border-[#E5E7EB]'}
                focus:border-[#3B82F6]`}
              value={formData.categoria}
              onChange={(e) =>
                setFormData({ ...formData, categoria: e.target.value })
              }
            >
              <option value="">Selecione...</option>
              <option value="Eletrônicos">Eletrônicos</option>
              <option value="Roupas">Roupas</option>
              <option value="Alimentos">Alimentos</option>
              <option value="Acessórios">Acessórios</option>
              <option value="Monitores">Monitores</option>
              <option value="Periféricos">Periféricos</option>
            </select>
            {erros.categoria && (
              <p className="text-red-500 text-xs mt-1 font-medium">
                {erros.categoria}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#374151] mb-1">
              URL da Imagem
            </label>
            <input
              placeholder="https://exemplo.com/foto-do-produto.jpg"
              className={`w-full p-3 border rounded-[8px] outline-none
                ${'border-[#E5E7EB]'}
                focus:border-[#3B82F6]`}
              value={formData.imagemUrl}
              onChange={(e) =>
                setFormData({ ...formData, imagemUrl: e.target.value })
              }
            />

            {formData.imagemUrl && (
              <div className="mt-4 flex flex-col items-center">
                <p className="text-[12px] text-[#6B7280] mb-2 uppercase tracking-wider font-bold">
                  Visualização da Imagem:
                </p>
                <div className="h-40 w-full bg-gray-50 rounded-[8px] overflow-hidden border border-dashed border-[#D1D5DB] flex items-center justify-center">
                  <img
                    src={formData.imagemUrl}
                    alt="Preview"
                    className="h-full w-full object-contain"
                    onError={(e) => {
                        e.target.src = "https://via.placeholder.com/300x200?text=Imagem+Inválida";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {produtoEdicao && (
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1">
                Status do Produto *
              </label>
              <select
                className={`w-full p-3 border rounded-[8px] outline-none transition-all ${
                  formData.ativo
                    ? "border-green-200 bg-green-50/30"
                    : "border-red-200 bg-red-50/30"
                }`}
                value={formData.ativo}
                onChange={(e) =>
                  setFormData({ ...formData, ativo: e.target.value === "true" })
                }
              >
                <option value="true">Ativo (Disponível para venda)</option>
                <option value="false">Inativo (Indisponível)</option>
              </select>
              <p className="text-[11px] text-[#6B7280] mt-1 italic">
                Produtos inativos não aparecem para os clientes finais.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-[#6B7280] font-bold hover:text-black transition-colors"
            >
              Cancelar
            </button>
            <button
                type="submit"
                disabled={
                    !formData.nome ||
                    !formData.categoria ||
                    !formData.preco ||
                    Number(formData.preco) <= 0 ||
                    formData.estoque === '' ||
                    Number(formData.estoque) < 0
                }
            className="bg-[#3B82F6] text-white px-8 py-3 rounded-[8px] font-bold 
                        hover:bg-[#2563EB] shadow-md transition-all active:scale-95
                        disabled:opacity-50 disabled:cursor-not-allowed"
            >
            Salvar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;