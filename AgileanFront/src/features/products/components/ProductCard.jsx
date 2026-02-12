const ProductCard = ({ produto, onEditar, onExcluir }) => {
  const isInativo = !produto.ativo;

  const precoFormatado = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(produto.preco);

  return (
    <div 
      className={`bg-white rounded-[12px] border border-[#E5E7EB] p-[16px] shadow-sm transition-all duration-300 flex flex-col h-full
        ${isInativo ? 'opacity-60' : 'hover:-translate-y-1 hover:shadow-lg'}`}
    >
      <div className="w-full h-48 bg-[#F3F4F6] rounded-lg mb-4 overflow-hidden flex items-center justify-center">
        {produto.imagemUrl ? (
          <img src={produto.imagemUrl} alt={produto.nome} className="w-full h-full object-cover" />
        ) : (
          <span className="text-[#6B7280] text-sm italic">Sem imagem</span>
        )}
      </div>


        <h3 className="text-[#1F2937] text-[18px] font-semibold mb-1">
            {produto.nome}
        </h3>

        <span className="text-[#3B82F6] text-[22px] font-bold mb-3 block">
        {precoFormatado}
        </span>

        <div className="flex items-center gap-2 mb-4 text-[13px] font-semibold flex-wrap">
        <span className="text-[#6B7280]">{produto.categoria}</span>

        {!produto.ativo && (
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
          🚫 Indisponível
          </span>
        )}


        {produto.estoque === 0 && produto.ativo && (
            <span className="bg-[#FEE2E2] text-[#991B1B] px-2 py-1 rounded-full">
            ❌ Sem estoque
            </span>
        )}

        {produto.estoque >= 1 && produto.estoque < 10 && produto.ativo && (
            <span className="bg-[#FEF3C7] text-[#92400E] px-2 py-1 rounded-full">
            ⚠️ {produto.estoque} unidades
            </span>
        )}

        {produto.estoque >= 10 && produto.ativo && (
            <span className="bg-[#D1FAE5] text-[#065F46] px-2 py-1 rounded-full">
            ✅ {produto.estoque} unidades
            </span>
        )}
        </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#E5E7EB]">
        <div className="flex gap-3">
        <button onClick={onEditar} className="text-[14px] font-semibold text-[#6B7280] hover:text-[#3B82F6]">
            ✏️ Editar
        </button>
        <button onClick={onExcluir} className="text-[14px] font-semibold text-[#6B7280] hover:text-[#EF4444]">
            🗑️ Excluir
        </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;