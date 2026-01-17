import { Activity, GitCompare } from 'lucide-react';

interface HeaderProps {
  onFinderClick: () => void;
  onCompareClick: () => void;
  onLogoClick: () => void;
  onLobinhoClick: () => void;
  compareCount: number;
}

export function Header({ onFinderClick, onCompareClick, onLogoClick, onLobinhoClick, compareCount }: HeaderProps) {
  return (
    <header className="fixed top-0 w-full z-40 bg-[#050a14]/90 backdrop-blur-md border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
        <button
          onClick={onLogoClick}
          className="flex items-center hover:opacity-80 transition-opacity group"
          aria-label="Voltar ao início"
        >
          <img
            src="/logo-wolflab.png"
            alt="Wolf Lab"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain drop-shadow-[0_0_8px_rgba(140,198,63,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(140,198,63,0.5)] transition-all"
          />
        </button>

        <div className="flex items-center gap-2 md:gap-3">
          {compareCount > 0 && (
            <button
              onClick={onCompareClick}
              className="relative bg-[#8CC63F]/20 hover:bg-[#8CC63F]/30 border border-[#8CC63F]/50 text-[#8CC63F] text-xs font-bold py-2 px-3 md:px-4 rounded-full flex items-center gap-2 transition-all active:scale-95"
              aria-label={`Comparar ${compareCount} tênis`}
            >
              <GitCompare size={14} />
              <span className="hidden sm:inline">COMPARAR</span>
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#8CC63F] text-[#050a14] rounded-full text-[10px] font-black flex items-center justify-center animate-pulse">
                {compareCount}
              </span>
            </button>
          )}

          <button
            onClick={onLobinhoClick}
            className="bg-gradient-to-r from-[#8CC63F]/20 to-emerald-500/20 hover:from-[#8CC63F] hover:to-emerald-500 hover:text-[#050a14] border border-[#8CC63F]/30 hover:border-[#8CC63F] text-xs font-bold py-2 px-3 md:px-5 rounded-full flex items-center gap-2 transition-all active:scale-95 group"
            aria-label="Falar com Lobinho"
          >
            <span className="text-base">🐺</span>
            <span className="hidden sm:inline">LOBINHO</span>
          </button>

          <button
            onClick={onFinderClick}
            className="bg-white/5 hover:bg-[#8CC63F] hover:text-[#050a14] border border-white/10 hover:border-[#8CC63F] text-xs font-bold py-2 px-3 md:px-5 rounded-full flex items-center gap-2 transition-all active:scale-95 group"
            aria-label="Abrir Wolf Lab Finder"
          >
            <Activity size={14} className="text-[#8CC63F] group-hover:text-[#050a14]" />
            <span>FINDER</span>
          </button>
        </div>
      </div>
    </header>
  );
}
