import { useState } from 'react';
import { ChevronRight, Scale, Ruler, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onCompareToggle: (product: Product) => void;
  isInCompare: boolean;
  isRecommended?: boolean;
}

export function ProductCard({ product, onClick, onCompareToggle, isInCompare, isRecommended }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <article
      className="group relative bg-[#0B162A] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#8CC63F]/30"
    >
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute top-4 right-4 z-20 bg-[#8CC63F] text-[#050a14] text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg animate-pulse">
          Recomendado
        </div>
      )}

      {/* Compare Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onCompareToggle(product);
        }}
        className={`absolute top-4 left-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 ${
          isInCompare
            ? 'bg-[#8CC63F] text-[#050a14]'
            : 'bg-black/60 backdrop-blur-md text-white border border-white/20 hover:border-[#8CC63F]'
        }`}
        aria-label={isInCompare ? 'Remover da comparação' : 'Adicionar à comparação'}
        title={isInCompare ? 'Remover da comparação' : 'Comparar'}
      >
        {isInCompare ? <Check size={14} strokeWidth={3} /> : <Plus size={14} />}
      </button>

      {/* Clickable Area */}
      <div onClick={onClick} className="cursor-pointer active:scale-[0.98] transition-transform">
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-gray-800 to-[#0B162A]">
          {/* Skeleton loader */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse" />
          )}

          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ${
              imageLoaded ? 'opacity-90 group-hover:opacity-100' : 'opacity-0'
            }`}
          />

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B162A] via-transparent to-transparent opacity-60" />

          {/* Floating Tags */}
          <div className="absolute top-14 left-4 flex flex-wrap gap-2">
            {product.tags.slice(0, 2).map(tag => (
              <span
                key={tag}
                className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Gradient Overlay for Text Readability */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0B162A] via-[#0B162A]/80 to-transparent" />
        </div>

        {/* CARD CONTENT */}
        <div className="relative p-6 -mt-12 z-10">
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-[#8CC63F] text-[10px] font-bold uppercase tracking-widest mb-1">
                {product.subhead}
              </p>
              <h3 className="text-2xl font-black text-white leading-none">{product.name}</h3>
            </div>
            <div className="bg-[#8CC63F] w-10 h-10 rounded-full flex items-center justify-center text-[#050a14] shadow-[0_0_15px_#8CC63F] group-hover:scale-110 transition-transform">
              <ChevronRight size={20} />
            </div>
          </div>

          {/* Mini Specs Row */}
          <div className="flex items-center gap-6 mt-4 text-gray-400 text-xs font-medium border-t border-white/5 pt-4">
            <div className="flex items-center gap-1.5">
              <Scale size={14} className="text-[#8CC63F]" aria-hidden="true" />
              <span>{product.weight}g</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Ruler size={14} className="text-[#8CC63F]" aria-hidden="true" />
              <span>{product.drop}mm Drop</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
