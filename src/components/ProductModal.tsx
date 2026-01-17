import { X, Activity, Layers, Zap, Shield, Info, Play, RotateCcw, Plus, Check } from 'lucide-react';
import { Product } from '../types';
import { StatBar } from './StatBar';
import { THEME } from '../data/products';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onCompareToggle: (product: Product) => void;
  isInCompare: boolean;
  onStartTest: (product: Product) => void;
}

export function ProductModal({ product, onClose, onCompareToggle, isInCompare, onStartTest }: ProductModalProps) {

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      {/* Modal Container - Fullscreen mobile, centered desktop */}
      <div
        className="min-h-screen md:min-h-0 md:my-8 md:mx-auto md:max-w-4xl md:rounded-3xl bg-[#050a14] md:border md:border-white/10 md:shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 flex justify-between items-center p-4 md:p-6 bg-gradient-to-b from-[#050a14] via-[#050a14]/90 to-transparent md:rounded-t-3xl">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/5 hover:bg-white/20 transition-colors active:scale-95"
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Manual Técnico</span>
          <button
            onClick={() => onCompareToggle(product)}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isInCompare
                ? 'bg-[#8CC63F] text-[#050a14]'
                : 'bg-white/10 backdrop-blur-md text-white border border-white/5 hover:border-[#8CC63F]'
            }`}
            aria-label={isInCompare ? 'Remover da comparação' : 'Adicionar à comparação'}
          >
            {isInCompare ? <Check size={18} strokeWidth={3} /> : <Plus size={18} />}
          </button>
        </header>

        {/* Content - Stack on mobile, Side by side on desktop */}
        <div className="px-4 pb-32 md:px-8 md:pb-8 md:grid md:grid-cols-2 md:gap-8">

          {/* Left Column - Image & Basic Info */}
          <div className="md:sticky md:top-24 md:self-start">
            {/* Imagem Hero */}
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 shadow-2xl border border-white/5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050a14] via-transparent to-transparent opacity-90" />

              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#8CC63F] text-[10px] font-bold uppercase tracking-widest mb-2">
                  {product.subhead}
                </p>
                <h2 id="modal-title" className="text-3xl md:text-4xl font-black text-white leading-none mb-3">
                  {product.name}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase px-2 py-1 bg-[#8CC63F] text-[#050a14] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Descrição - visible on mobile, hidden on desktop (moved to right) */}
            <p className="text-gray-300 leading-relaxed mb-6 text-sm md:hidden">
              {product.description}
            </p>

            {/* CTA Desktop */}
            <div className="hidden md:flex gap-3 mb-6">
              <button
                onClick={() => onStartTest(product)}
                className="flex-1 bg-[#8CC63F] hover:bg-[#7ab32e] text-[#050a14] py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(140,198,63,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Play size={18} fill="currentColor" aria-hidden="true" />
                Testar na Esteira
              </button>
              <button
                onClick={() => onCompareToggle(product)}
                className={`px-6 py-4 rounded-xl font-bold text-sm uppercase transition-all active:scale-95 ${
                  isInCompare
                    ? 'bg-[#8CC63F]/20 text-[#8CC63F] border border-[#8CC63F]'
                    : 'bg-[#0B162A] border border-white/20 text-white hover:border-[#8CC63F]'
                }`}
              >
                {isInCompare ? 'Adicionado' : 'Comparar'}
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div>
            {/* Descrição - Desktop only */}
            <p className="hidden md:block text-gray-300 leading-relaxed mb-8 text-base">
              {product.description}
            </p>

            {/* Stats Bars */}
            <section className="bg-[#0B162A] rounded-2xl p-5 md:p-6 mb-6 border border-white/5" aria-label="Performance">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase">
                <Activity size={16} className="text-[#8CC63F]" aria-hidden="true" />
                Performance Lab
              </h3>
              <StatBar icon={Layers} label="Amortecimento" value={product.stats.cushion} color={THEME.cushion} />
              <StatBar icon={Zap} label="Retorno de Energia" value={product.stats.responsiveness} color={THEME.speed} />
              <StatBar icon={Shield} label="Estabilidade" value={product.stats.stability} color={THEME.stability} />
            </section>

            {/* Grid Técnico */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-[#0B162A] p-4 rounded-2xl border border-white/5 text-center">
                <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Peso</div>
                <div className="text-xl md:text-2xl font-black text-white">
                  {product.weight}<span className="text-sm text-gray-500 font-normal">g</span>
                </div>
              </div>
              <div className="bg-[#0B162A] p-4 rounded-2xl border border-white/5 text-center">
                <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Drop</div>
                <div className="text-xl md:text-2xl font-black text-white">
                  {product.drop}<span className="text-sm text-gray-500 font-normal">mm</span>
                </div>
              </div>
              <div className="bg-[#0B162A] p-4 rounded-2xl border border-white/5 text-center">
                <div className="text-gray-500 text-[10px] uppercase font-bold mb-1">Stack</div>
                <div className="text-xs md:text-sm font-bold text-white leading-tight">
                  {product.stack}
                </div>
              </div>
            </div>

            {/* Specs de Engenharia */}
            <section aria-label="Composição">
              <h3 className="text-white font-bold text-sm uppercase flex items-center gap-2 mb-4">
                <Info size={16} className="text-[#8CC63F]" aria-hidden="true" />
                Composição
              </h3>
              <div className="bg-[#0B162A] rounded-2xl overflow-hidden border border-white/5">
                <div className="p-4 border-b border-white/5 flex justify-between items-center">
                  <span className="text-xs text-gray-400 uppercase font-bold">Entressola</span>
                  <span className="text-sm text-white font-medium">{product.tech.foam}</span>
                </div>
                {product.tech.plate && (
                  <div className="p-4 border-b border-white/5 flex justify-between items-center bg-[#8CC63F]/5">
                    <span className="text-xs text-[#8CC63F] uppercase font-bold flex items-center gap-1">
                      <Zap size={12} aria-hidden="true" /> Placa
                    </span>
                    <span className="text-sm text-white font-medium">{product.tech.plate}</span>
                  </div>
                )}
                <div className="p-4 flex justify-between items-center">
                  <span className="text-xs text-gray-400 uppercase font-bold">Cabedal</span>
                  <span className="text-sm text-white font-medium">{product.tech.upper}</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Floating CTA Bottom - Mobile only */}
        <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[#050a14] via-[#050a14] to-transparent z-30 md:hidden">
          <div className="flex gap-3 max-w-2xl mx-auto">
            <button
              onClick={() => onStartTest(product)}
              className="flex-1 bg-[#8CC63F] hover:bg-[#7ab32e] text-[#050a14] py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(140,198,63,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Play size={18} fill="currentColor" aria-hidden="true" />
              Testar na Esteira
            </button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-[#0B162A] border border-white/20 text-white p-4 rounded-xl hover:bg-white/10 active:scale-95 transition-all"
              aria-label="Voltar ao topo"
            >
              <RotateCcw size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
