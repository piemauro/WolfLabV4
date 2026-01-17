import { useState } from 'react';
import { Activity, ChevronRight, X, ChevronLeft, Sparkles } from 'lucide-react';
import { FinderAnswer } from '../types';

interface ShoeFinderProps {
  onComplete: (category: string) => void;
  onClose: () => void;
}

const questions = [
  {
    id: 'level',
    title: 'Qual seu nível atual?',
    subtitle: 'Isso nos ajuda a calibrar nossas sugestões',
    options: [
      { label: 'Começando Agora', icon: '🌱', value: 'iniciante', desc: 'Menos de 6 meses correndo' },
      { label: 'Corredor de Fim de Semana', icon: '🏃', value: 'intermediario', desc: '10-30km por semana' },
      { label: 'Focado em Performance', icon: '⚡', value: 'avancado', desc: 'Treino estruturado, provas frequentes' }
    ]
  },
  {
    id: 'goal',
    title: 'Qual o objetivo do próximo tênis?',
    subtitle: 'Cada modelo foi projetado para um propósito',
    options: [
      { label: 'Rodagem & Conforto', value: 'rodagem', desc: 'Quero proteger minhas pernas nos treinos longos' },
      { label: 'Treinos de Velocidade', value: 'velocidade', desc: 'Tiros, fartleks e tempo runs' },
      { label: 'Bater meu Recorde (RP)', value: 'elite', desc: 'Máxima performance em provas' },
      { label: 'Corrigir Pisada', value: 'estabilidade', desc: 'Sinto que meu pé cai para dentro' }
    ]
  },
  {
    id: 'feel',
    title: 'O que você prefere sentir?',
    subtitle: 'Sensação é pessoal - não existe errado',
    options: [
      { label: 'Nuvens (Macio)', value: 'soft', desc: 'Máximo amortecimento, sensação de flutuar' },
      { label: 'Mola (Responsivo)', value: 'bouncy', desc: 'Retorno de energia, impulsão' },
      { label: 'Chão (Firme)', value: 'firm', desc: 'Sentir o terreno, controle total' }
    ]
  }
];

export function ShoeFinder({ onComplete, onClose }: ShoeFinderProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswer>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (val: string) => {
    const currentQ = questions[step];
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 200);
    } else {
      const recommendedCategory = calculateRecommendation(newAnswers);
      onComplete(recommendedCategory);
    }
  };

  const calculateRecommendation = (ans: FinderAnswer): string => {
    if (ans.goal === 'elite') return 'elite';
    if (ans.goal === 'estabilidade') return 'estabilidade';
    if (ans.goal === 'velocidade') return 'velocidade';
    if (ans.goal === 'rodagem') return 'rodagem';

    if (ans.level === 'avancado') {
      if (ans.feel === 'bouncy') return 'elite';
      return 'velocidade';
    }

    if (ans.level === 'iniciante') {
      if (ans.feel === 'firm') return 'estabilidade';
      return 'rodagem';
    }

    if (ans.feel === 'soft') return 'rodagem';
    if (ans.feel === 'bouncy') return 'velocidade';
    return 'rodagem';
  };

  const handleBack = () => {
    if (step > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsAnimating(false);
      }, 200);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Wolf Lab Finder"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-xl md:rounded-3xl bg-[#050a14] md:border md:border-white/10 md:shadow-2xl flex flex-col animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 md:p-6 flex justify-between items-center border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                aria-label="Voltar"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="text-[#8CC63F]" size={20} />
              Wolf Lab Finder
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-8 overflow-y-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex gap-2 mb-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                    i < step ? 'bg-[#8CC63F]' : i === step ? 'bg-[#8CC63F] animate-pulse' : 'bg-gray-800'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 text-right">
              {step + 1} de {questions.length}
            </p>
          </div>

          {/* Question */}
          <div className={`transition-all duration-200 ${isAnimating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{questions[step].title}</h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">{questions[step].subtitle}</p>

            {/* Options */}
            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left p-4 md:p-5 rounded-xl bg-[#0B162A] border border-white/5 hover:border-[#8CC63F] hover:bg-[#8CC63F]/5 transition-all group active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="text-base md:text-lg font-bold text-white block mb-1">
                        {'icon' in opt && <span className="mr-2">{opt.icon}</span>}
                        {opt.label}
                      </span>
                      <span className="text-xs md:text-sm text-gray-400">{opt.desc}</span>
                    </div>
                    <ChevronRight className="text-gray-600 group-hover:text-[#8CC63F] transition-colors ml-3" size={20} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="p-4 text-center border-t border-white/5 shrink-0">
          <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
            <Sparkles size={12} className="text-[#8CC63F]" />
            Baseado em ciência da corrida e análise biomecânica
          </p>
        </div>
      </div>
    </div>
  );
}
