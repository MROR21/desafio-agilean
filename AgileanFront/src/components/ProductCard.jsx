import React from 'react';

const ProductCard = ({ produto, onEditar, onExcluir }) => {
  const isEstoqueBaixo = produto.estoque >= 1 && produto.estoque < 10;
  const isSemEstoque = produto.estoque === 0;
  const isInativo = !produto.ativo;

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  return (
    <div 
      className={`bg-white rounded-[12px] border border-[#E5E7EB] p-[16px] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full
      [cite_start]${isInativo ? 'opacity-60 grayscale-[0.5]' : 'hover:-translate-y-1'}`}
    >
      <div className="w-full h-48 bg-[#F3F4F6] rounded-lg mb-4 overflow-hidden flex items-center justify-center">
        {produto.imagemUrl ? (
          <img src={produto.imagemUrl} alt={produto.nome} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[#6B7280] text-sm italic">Sem imagem</span>
        )}
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {isInativo ? (
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-[12px] font-semibold italic">
            🚫 Indisponível
          </span>
        ) : isSemEstoque ? (
          <span className="bg-[#FEE2E2] text-[#991B1B] px-3 py-1 rounded-full text-[12px] font-semibold">
            ❌ Sem Estoque
          </span>
        ) : isEstoqueBaixo ? (
          <span className="bg-[#FEF3C7] text-[#92400E] px-3 py-1 rounded-full text-[12px] font-semibold">
            ⚠️ Apenas {produto.estoque} unidades
          </span>
        ) : (
          <span className="bg-[#D1FAE5] text-[#065F46] px-3 py-1 rounded-full text-[12px] font-semibold">
            ✅ {produto.estoque} unidades
          </span>
        )}
      </div>

      <h3 className="text-[#1F2937] text-[18px] font-semibold mb-1 truncate">{produto.nome}</h3>
      <p className="text-[#6B7280] text-[14px] mb-4 flex-grow">{produto.categoria}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E5E7EB]">
        <span className="text-[#3B82F6] text-[22px] font-bold">
          {precoFormatado}
        </span>
        
        <div className="flex gap-3">
        <button onClick={onEditar} className="text-[14px] font-semibold text-[#6B7280] hover:text-[#3B82F6]">
            ✏️ Editar
        </button>
        <button className="text-[14px] font-semibold text-[#6B7280] hover:text-[#EF4444]">
            🗑️ Excluir
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;