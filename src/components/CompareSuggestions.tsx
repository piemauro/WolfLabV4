import { X, GitCompare, Zap, ChevronRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';

interface CompareSuggestionsProps {
  selectedProduct: Product;
  compareList: Product[];
  onAddToCompare: (product: Product) => void;
  onClose: () => void;
  onViewComparison: () => void;
}

// Lógica de recomendação inteligente
function getSuggestedProducts(selected: Product, currentCompareList: Product[]): { product: Product; reason: string }[] {
  const suggestions: { product: Product; reason: string; score: number }[] = [];
  const excludeIds = [selected.id, ...currentCompareList.map(p => p.id)];

  PRODUCTS.forEach(product => {
    if (excludeIds.includes(product.id)) return;

    let score = 0;
    let reason = '';

    // Mesma categoria = comparação direta
    if (product.category === selected.category) {
      score += 30;
      reason = 'Mesma categoria - comparação direta';
    }

    // Peso similar (±30g)
    if (Math.abs(product.weight - selected.weight) <= 30) {
      score += 20;
      reason = reason || 'Peso similar';
    }

    // Drop similar (±2mm)
    if (Math.abs(product.drop - selected.drop) <= 2) {
      score += 15;
      reason = reason || 'Drop similar';
    }

    // Categoria complementar
    const complementary: Record<string, string[]> = {
      'elite': ['velocidade', 'rodagem'],
      'velocidade': ['elite', 'rodagem'],
      'rodagem': ['estabilidade', 'velocidade'],
      'estabilidade': ['rodagem']
    };

    if (complementary[selected.category]?.includes(product.category)) {
      score += 25;
      const categoryNames: Record<string, string> = {
        'elite': 'Elite Day',
        'velocidade': 'Velocidade',
        'rodagem': 'Rodagem',
        'estabilidade': 'Estabilidade'
      };
      reason = `Complementar: ${categoryNames[selected.category]} vs ${categoryNames[product.category]}`;
    }

    // Stats contrastantes (interessante para comparar)
    const cushionDiff = Math.abs(product.stats.cushion - selected.stats.cushion);
    const speedDiff = Math.abs(product.stats.responsiveness - selected.stats.responsiveness);

    if (cushionDiff > 30 || speedDiff > 30) {
      score += 10;
      if (!reason) {
        reason = cushionDiff > speedDiff ? 'Amortecimento bem diferente' : 'Responsividade contrastante';
      }
    }

    if (score > 0) {
      suggestions.push({ product, reason, score });
    }
  });

  // Ordenar por score e retornar top 3
  return suggestions
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ product, reason }) => ({ product, reason }));
}

export function CompareSuggestions({
  selectedProduct,
  compareList,
  onAddToCompare,
  onClose,
  onViewComparison
}: CompareSuggestionsProps) {
  const suggestions = getSuggestedProducts(selectedProduct, compareList);
  const totalInCompare = compareList.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full md:max-w-lg bg-[#050a14] rounded-t-3xl md:rounded-3xl border-t md:border border-white/10 shadow-2xl animate-slide-up max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-5 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#8CC63F]/20 flex items-center justify-center">
                <GitCompare size={18} className="text-[#8CC63F]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Comparar</h2>
                <p className="text-xs text-gray-400">{totalInCompare + 1} de 3 selecionados</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Selected Product Mini Card */}
          <div className="flex items-center gap-3 p-3 bg-[#0B162A] rounded-xl border border-[#8CC63F]/30">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-[#8CC63F] text-[9px] font-bold uppercase tracking-widest">Adicionado</p>
              <p className="text-white font-bold text-sm truncate">{selectedProduct.name}</p>
              <p className="text-gray-400 text-xs">{selectedProduct.weight}g • {selectedProduct.drop}mm drop</p>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#8CC63F] flex items-center justify-center">
              <Zap size={12} className="text-[#050a14]" />
            </div>
          </div>
        </header>

        {/* Suggestions */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={14} className="text-[#8CC63F]" />
            <p className="text-xs text-gray-400 uppercase font-bold">Sugestões para comparar</p>
          </div>

          <div className="space-y-3">
            {suggestions.map(({ product, reason }) => (
              <button
                key={product.id}
                onClick={() => onAddToCompare(product)}
                className="w-full flex items-center gap-3 p-3 bg-[#0B162A] rounded-xl border border-white/5 hover:border-[#8CC63F]/50 hover:bg-[#8CC63F]/5 transition-all group active:scale-[0.98]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-white font-bold text-sm truncate">{product.name}</p>
                  <p className="text-gray-500 text-xs mb-1">{product.weight}g • {product.drop}mm drop</p>
                  <p className="text-[#8CC63F] text-[10px] font-medium">{reason}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#8CC63F] flex items-center justify-center transition-colors">
                  <ChevronRight size={16} className="text-gray-400 group-hover:text-[#050a14]" />
                </div>
              </button>
            ))}
          </div>

          {suggestions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">Todos os modelos já estão na comparação!</p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-white/10 shrink-0 space-y-3">
          {totalInCompare >= 1 && (
            <button
              onClick={onViewComparison}
              className="w-full bg-[#8CC63F] hover:bg-[#7ab32e] text-[#050a14] py-4 rounded-xl font-black text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(140,198,63,0.3)] flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <GitCompare size={18} />
              Ver Comparação ({totalInCompare + 1} tênis)
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm transition-colors"
          >
            Continuar Navegando
          </button>
        </div>
      </div>
    </div>
  );
}
