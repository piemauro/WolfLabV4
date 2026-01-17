import { useState, useEffect, useMemo } from 'react';
import { Product, ViewType } from './types';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ShoeFinder } from './components/ShoeFinder';
import { CompareModal } from './components/CompareModal';
import { CompareSuggestions } from './components/CompareSuggestions';
import { Lobinho } from './components/Lobinho';
import { RunTimer } from './components/RunTimer';

export default function App() {
  const [view, setView] = useState<ViewType>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState('todos');
  const [isLoading, setIsLoading] = useState(true);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [recommendedCategory, setRecommendedCategory] = useState<string | null>(null);

  // Estado para controlar sugestões de comparação
  const [showCompareSuggestions, setShowCompareSuggestions] = useState(false);
  const [lastAddedToCompare, setLastAddedToCompare] = useState<Product | null>(null);

  // Estado para controlar Lobinho (assistente IA)
  const [showLobinho, setShowLobinho] = useState(false);

  // Estado para controlar RunTimer (cronômetro de teste)
  const [testingProduct, setTestingProduct] = useState<Product | null>(null);

  // Simular loading inicial
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Filtrar produtos
  const filteredProducts = useMemo(() => {
    if (filter === 'todos') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === filter);
  }, [filter]);

  // Handler para resultado do Finder
  const handleFinderResult = (category: string) => {
    setRecommendedCategory(category);
    setFilter(category);
    setView('catalog');
  };

  // Adicionar à comparação (com sugestões)
  const handleAddToCompare = (product: Product) => {
    const exists = compareList.find(p => p.id === product.id);

    if (exists) {
      // Se já existe, remove
      setCompareList(prev => prev.filter(p => p.id !== product.id));
      return;
    }

    // Adiciona e mostra sugestões
    setCompareList(prev => {
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });

    setLastAddedToCompare(product);
    setShowCompareSuggestions(true);
  };

  // Adicionar da modal de sugestões (sem abrir nova modal)
  const handleAddFromSuggestions = (product: Product) => {
    setCompareList(prev => {
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
    setLastAddedToCompare(product);
  };

  // Verificar se produto está na lista de comparação
  const isInCompare = (productId: string) => compareList.some(p => p.id === productId);

  // Reset filters
  const handleLogoClick = () => {
    setFilter('todos');
    setView('catalog');
    setRecommendedCategory(null);
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050a14] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#8CC63F]/20 via-[#050a14] to-[#050a14]" />
        <div className="relative animate-pulse">
          <img
            src="/logo-wolflab.png"
            alt="Wolf Lab"
            className="h-12 md:h-16 w-auto object-contain drop-shadow-[0_0_30px_rgba(140,198,63,0.5)]"
          />
        </div>
        <p className="mt-8 text-[#8CC63F]/70 font-mono text-[10px] uppercase tracking-[0.3em]">
          Carregando...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050a14] font-sans text-gray-100 pb-20 selection:bg-[#8CC63F] selection:text-black">
      {/* HEADER */}
      <Header
        onFinderClick={() => setView('finder')}
        onCompareClick={() => setView('compare')}
        onLogoClick={handleLogoClick}
        onLobinhoClick={() => setShowLobinho(true)}
        compareCount={compareList.length}
      />

      <main className="pt-28 md:pt-32 max-w-7xl mx-auto px-4 md:px-8">
        {view === 'catalog' && (
          <>
            {/* HERO TEXT */}
            <section className="mb-8 md:mb-12 md:text-center" aria-label="Introdução">
              <h1 className="text-3xl md:text-5xl font-black text-white mb-2 md:mb-4 leading-tight">
                Engenharia para <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8CC63F] to-emerald-400">
                  sua performance.
                </span>
              </h1>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed md:max-w-xl md:mx-auto">
                Explore a coleção técnica. Clique nos modelos para acessar o raio-x completo.
              </p>
            </section>

            {/* Finder Result Banner */}
            {recommendedCategory && (
              <div className="mb-6 md:mb-8 p-4 bg-[#8CC63F]/10 border border-[#8CC63F]/30 rounded-xl flex items-center justify-between animate-fade-in md:max-w-2xl md:mx-auto">
                <div>
                  <p className="text-xs text-[#8CC63F] font-bold uppercase">Recomendação Wolf Lab</p>
                  <p className="text-white text-sm">
                    Baseado no seu perfil, recomendamos{' '}
                    <span className="font-bold">{CATEGORIES.find(c => c.id === recommendedCategory)?.label}</span>
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRecommendedCategory(null);
                    setFilter('todos');
                  }}
                  className="text-xs text-gray-400 hover:text-white underline"
                >
                  Limpar
                </button>
              </div>
            )}

            {/* CATEGORY TABS */}
            <nav
              className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:justify-center sticky top-20 md:top-24 z-30 bg-[#050a14]/95 pt-2 backdrop-blur-xl"
              aria-label="Categorias"
            >
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`whitespace-nowrap px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all active:scale-95 hover:scale-105 ${
                    filter === cat.id
                      ? 'bg-[#8CC63F] text-[#050a14] shadow-[0_0_15px_rgba(140,198,63,0.4)] scale-105'
                      : 'bg-[#0B162A] border border-white/5 text-gray-400 hover:border-[#8CC63F]/50 hover:text-white'
                  }`}
                  aria-pressed={filter === cat.id}
                >
                  {cat.label}
                </button>
              ))}
            </nav>

            {/* PRODUCT GRID - 1 col mobile, 2 cols tablet, 3 cols desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pb-12">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                  onCompareToggle={handleAddToCompare}
                  isInCompare={isInCompare(product.id)}
                  isRecommended={recommendedCategory === product.category && recommendedCategory !== null}
                />
              ))}

              {filteredProducts.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Nenhum modelo encontrado nesta categoria.</p>
                  <button
                    onClick={() => setFilter('todos')}
                    className="mt-4 text-[#8CC63F] font-bold underline hover:no-underline"
                  >
                    Ver todos
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* SHOE FINDER */}
        {view === 'finder' && (
          <ShoeFinder
            onClose={() => setView('catalog')}
            onComplete={handleFinderResult}
          />
        )}
      </main>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onCompareToggle={handleAddToCompare}
          isInCompare={isInCompare(selectedProduct.id)}
          onStartTest={(product) => {
            setSelectedProduct(null);
            setTestingProduct(product);
          }}
        />
      )}

      {/* COMPARE SUGGESTIONS MODAL */}
      {showCompareSuggestions && lastAddedToCompare && (
        <CompareSuggestions
          selectedProduct={lastAddedToCompare}
          compareList={compareList.filter(p => p.id !== lastAddedToCompare.id)}
          onAddToCompare={handleAddFromSuggestions}
          onClose={() => setShowCompareSuggestions(false)}
          onViewComparison={() => {
            setShowCompareSuggestions(false);
            setView('compare');
          }}
        />
      )}

      {/* COMPARE MODAL */}
      {view === 'compare' && (
        <CompareModal
          products={compareList}
          onClose={() => setView('catalog')}
          onRemove={(product) => {
            setCompareList(prev => prev.filter(p => p.id !== product.id));
            if (compareList.length <= 1) {
              setView('catalog');
            }
          }}
        />
      )}

      {/* LOBINHO - Assistente IA */}
      {showLobinho && (
        <Lobinho
          onClose={() => setShowLobinho(false)}
          onSelectProduct={(product) => {
            setShowLobinho(false);
            setSelectedProduct(product);
          }}
        />
      )}

      {/* RUN TIMER - Cronômetro de teste */}
      {testingProduct && (
        <RunTimer
          product={testingProduct}
          onClose={() => setTestingProduct(null)}
        />
      )}
    </div>
  );
}
