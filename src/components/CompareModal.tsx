import { X, Layers, Zap, Shield, Scale, Ruler, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { THEME } from '../data/products';

interface CompareModalProps {
  products: Product[];
  onClose: () => void;
  onRemove: (product: Product) => void;
}

export function CompareModal({ products, onClose, onRemove }: CompareModalProps) {
  if (products.length === 0) return null;

  const maxCushion = Math.max(...products.map(p => p.stats.cushion));
  const maxResponsiveness = Math.max(...products.map(p => p.stats.responsiveness));
  const maxStability = Math.max(...products.map(p => p.stats.stability));
  const minWeight = Math.min(...products.map(p => p.weight));

  const CompareBar = ({ value, maxValue, color }: { value: number; maxValue: number; color: string }) => (
    <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{
          width: `${value}%`,
          backgroundColor: value === maxValue ? color : `${color}60`,
          boxShadow: value === maxValue ? `0 0 10px ${color}` : 'none'
        }}
      />
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Comparar tênis"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="min-h-screen md:min-h-0 md:my-8 md:mx-auto md:max-w-4xl md:rounded-3xl bg-[#050a14] md:border md:border-white/10 md:shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="sticky top-0 z-20 p-4 md:p-6 bg-[#050a14]/95 backdrop-blur-md border-b border-white/5 flex items-center justify-between md:rounded-t-3xl">
          <h2 className="text-lg md:text-xl font-bold text-white">
            Comparando <span className="text-[#8CC63F]">{products.length}</span> tênis
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Fechar comparação"
          >
            <X size={20} />
          </button>
        </header>

        <div className="p-4 md:p-8 pb-8">
          {/* Products Row */}
          <div className={`grid gap-4 md:gap-6 mb-8 ${
            products.length === 1 ? 'grid-cols-1 max-w-xs mx-auto' :
            products.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3'
          }`}>
            {products.map((product) => (
              <div key={product.id} className="relative group">
                <button
                  onClick={() => onRemove(product)}
                  className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-red-500/20 hover:bg-red-500/40 rounded-full flex items-center justify-center text-red-400 hover:text-red-300 transition-all opacity-70 group-hover:opacity-100"
                  aria-label={`Remover ${product.name}`}
                >
                  <Trash2 size={14} />
                </button>
                <div className="bg-[#0B162A] rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-colors">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-[#8CC63F] text-[9px] font-bold uppercase tracking-widest mb-1">
                      {product.subhead}
                    </p>
                    <h3 className="text-xs md:text-sm font-black text-white leading-tight">{product.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Two column layout on desktop */}
          <div className="md:grid md:grid-cols-2 md:gap-6">
            {/* Specs Comparison */}
            <section className="mb-6 md:mb-0">
              <h3 className="text-white font-bold text-xs uppercase mb-4 flex items-center gap-2">
                <Scale size={14} className="text-[#8CC63F]" />
                Especificações
              </h3>
              <div className="bg-[#0B162A] rounded-2xl border border-white/5 overflow-hidden">
                {/* Weight */}
                <div className="p-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase font-bold mb-3">
                    <Scale size={12} /> Peso
                  </div>
                  <div className={`grid gap-3 ${products.length === 1 ? 'grid-cols-1' : products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {products.map(p => (
                      <div key={p.id} className="text-center">
                        <span className={`text-xl md:text-2xl font-black ${
                          p.weight === minWeight
                            ? 'text-[#8CC63F]'
                            : 'text-white'
                        }`}>
                          {p.weight}
                        </span>
                        <span className="text-gray-500 text-sm">g</span>
                        {p.weight === minWeight && products.length > 1 && (
                          <p className="text-[9px] text-[#8CC63F] mt-1">mais leve</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Drop */}
                <div className="p-4">
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase font-bold mb-3">
                    <Ruler size={12} /> Drop
                  </div>
                  <div className={`grid gap-3 ${products.length === 1 ? 'grid-cols-1' : products.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                    {products.map(p => (
                      <div key={p.id} className="text-center">
                        <span className="text-xl md:text-2xl font-black text-white">{p.drop}</span>
                        <span className="text-gray-500 text-sm">mm</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Performance Comparison */}
            <section>
              <h3 className="text-white font-bold text-xs uppercase mb-4 flex items-center gap-2">
                <Zap size={14} className="text-[#8CC63F]" />
                Performance
              </h3>
              <div className="bg-[#0B162A] rounded-2xl border border-white/5 p-4 md:p-5 space-y-5">
                {/* Cushion */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase font-bold mb-3">
                    <Layers size={12} /> Amortecimento
                  </div>
                  <div className="space-y-2">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 w-16 md:w-24 truncate">{p.name.split(' ').slice(-1)}</span>
                        <div className="flex-1">
                          <CompareBar value={p.stats.cushion} maxValue={maxCushion} color={THEME.cushion} />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right ${
                          p.stats.cushion === maxCushion ? 'text-[#60A5FA]' : 'text-gray-500'
                        }`}>
                          {p.stats.cushion}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Responsiveness */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase font-bold mb-3">
                    <Zap size={12} /> Retorno de Energia
                  </div>
                  <div className="space-y-2">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 w-16 md:w-24 truncate">{p.name.split(' ').slice(-1)}</span>
                        <div className="flex-1">
                          <CompareBar value={p.stats.responsiveness} maxValue={maxResponsiveness} color={THEME.speed} />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right ${
                          p.stats.responsiveness === maxResponsiveness ? 'text-[#8CC63F]' : 'text-gray-500'
                        }`}>
                          {p.stats.responsiveness}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stability */}
                <div>
                  <div className="flex items-center gap-2 text-gray-400 text-[10px] uppercase font-bold mb-3">
                    <Shield size={12} /> Estabilidade
                  </div>
                  <div className="space-y-2">
                    {products.map(p => (
                      <div key={p.id} className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-500 w-16 md:w-24 truncate">{p.name.split(' ').slice(-1)}</span>
                        <div className="flex-1">
                          <CompareBar value={p.stats.stability} maxValue={maxStability} color={THEME.stability} />
                        </div>
                        <span className={`text-xs font-bold w-8 text-right ${
                          p.stats.stability === maxStability ? 'text-[#F59E0B]' : 'text-gray-500'
                        }`}>
                          {p.stats.stability}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Winner Summary */}
          {products.length >= 2 && (
            <div className="mt-6 p-4 md:p-5 bg-[#8CC63F]/10 border border-[#8CC63F]/30 rounded-2xl">
              <p className="text-xs text-gray-400 mb-3 font-bold uppercase">Resumo da comparação</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#050a14]/50 rounded-xl p-3 text-center">
                  <p className="text-[9px] text-[#60A5FA] uppercase font-bold mb-1">Mais Amortecido</p>
                  <p className="text-xs text-white font-bold truncate">
                    {products.find(p => p.stats.cushion === maxCushion)?.name.split(' ').slice(-2).join(' ')}
                  </p>
                </div>
                <div className="bg-[#050a14]/50 rounded-xl p-3 text-center">
                  <p className="text-[9px] text-[#8CC63F] uppercase font-bold mb-1">Mais Responsivo</p>
                  <p className="text-xs text-white font-bold truncate">
                    {products.find(p => p.stats.responsiveness === maxResponsiveness)?.name.split(' ').slice(-2).join(' ')}
                  </p>
                </div>
                <div className="bg-[#050a14]/50 rounded-xl p-3 text-center">
                  <p className="text-[9px] text-[#F59E0B] uppercase font-bold mb-1">Mais Estável</p>
                  <p className="text-xs text-white font-bold truncate">
                    {products.find(p => p.stats.stability === maxStability)?.name.split(' ').slice(-2).join(' ')}
                  </p>
                </div>
                <div className="bg-[#050a14]/50 rounded-xl p-3 text-center">
                  <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Mais Leve</p>
                  <p className="text-xs text-white font-bold truncate">
                    {products.find(p => p.weight === minWeight)?.name.split(' ').slice(-2).join(' ')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
