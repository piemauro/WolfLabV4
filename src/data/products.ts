import { Product, Category } from '../types';

// --- CORES DA MARCA WOLF ---
export const THEME = {
  green: '#8CC63F',
  dark: '#050a14',
  navy: '#0B162A',
  text: '#F3F4F6',
  gray: '#9CA3AF',
  cushion: '#60A5FA',
  speed: '#8CC63F',
  stability: '#F59E0B'
} as const;

// --- CATEGORIAS ---
export const CATEGORIES: Category[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'rodagem', label: 'Rodagem' },
  { id: 'velocidade', label: 'Velocidade' },
  { id: 'elite', label: 'Elite Day' },
  { id: 'estabilidade', label: 'Estabilidade' },
];

// --- DADOS DOS PRODUTOS ---
export const PRODUCTS: Product[] = [
  {
    id: 'elite-1',
    name: 'Wolf Alphaflyer Elite',
    subhead: 'O Quebrador de Recordes',
    category: 'elite',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
    weight: 205,
    drop: 8,
    stack: '39.5mm / 31.5mm',
    tags: ['Placa de Carbono', 'Super Foam', 'Race Day'],
    description: 'Engenharia pura focada em economia de energia. A geometria agressiva da placa de carbono te impulsiona para frente, enquanto a espuma WolfZ-Pebax oferece o maior retorno de energia do mercado.',
    tech: {
      foam: 'WolfZ-Pebax Supercritical',
      upper: 'AtomKnit 2.0',
      plate: 'FlyPlate Carbono Total'
    },
    stats: { cushion: 70, responsiveness: 100, stability: 40 }
  },
  {
    id: 'rodagem-1',
    name: 'Nimbus Cloud Max',
    subhead: 'Rodagem de Luxo',
    category: 'rodagem',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=1000',
    weight: 290,
    drop: 10,
    stack: '41mm / 31mm',
    tags: ['Max Cushion', 'Recuperação', 'Conforto'],
    description: 'Projetado para seus treinos longos e dias de recuperação. O amortecimento maximalista absorve o impacto do asfalto, poupando suas articulações para o próximo ciclo de treino.',
    tech: {
      foam: 'Nitro-Infused EVA',
      upper: 'Plush Jacquard Mesh',
    },
    stats: { cushion: 100, responsiveness: 50, stability: 80 }
  },
  {
    id: 'velocidade-1',
    name: 'Mach Speed 4',
    subhead: 'Treinos de Ritmo',
    category: 'velocidade',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1000',
    weight: 225,
    drop: 5,
    stack: '32mm / 27mm',
    tags: ['Tempo Run', 'Leveza', 'Versátil'],
    description: 'O tênis que desaparece no pé. Ideal para treinos intervalados (tiros) e fartleks. Sem placa, mas com uma espuma firme e reativa que permite sentir o chão e girar as pernas rápido.',
    tech: {
      foam: 'ProFly+ Dual Density',
      upper: 'Creel Mesh Mono',
    },
    stats: { cushion: 60, responsiveness: 90, stability: 60 }
  },
  {
    id: 'estabilidade-1',
    name: 'Kayano Guard 30',
    subhead: 'Suporte Inteligente',
    category: 'estabilidade',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=1000',
    weight: 305,
    drop: 10,
    stack: '35mm / 25mm',
    tags: ['Pronação', 'Estruturado', 'Longo Prazo'],
    description: 'Esqueça os tênis duros do passado. O novo sistema de estabilidade 4D guia sua passada de forma natural, corrigindo a pronação excessiva apenas quando você cansa.',
    tech: {
      foam: 'Gel-Tech + 4D Guidance',
      upper: 'Engineered Knit',
    },
    stats: { cushion: 85, responsiveness: 40, stability: 100 }
  },
  {
    id: 'elite-2',
    name: 'Wolf Prototype X',
    subhead: 'Conceito Ilegal',
    category: 'elite',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&q=80&w=1000',
    weight: 240,
    drop: 6,
    stack: '50mm / 44mm',
    tags: ['Conceito', 'Stack Ilegal', 'Treino Elite'],
    description: 'Com 50mm de altura, este tênis é tecnicamente ilegal para corridas oficiais da World Athletics. Desbloqueie uma vantagem mecânica injusta nos seus treinos longos de domingo.',
    tech: {
      foam: 'Double Stack Pebax',
      upper: 'Strung Textile',
      plate: 'Dual Carbon Blades'
    },
    stats: { cushion: 95, responsiveness: 95, stability: 20 }
  },
  {
    id: 'velocidade-2',
    name: 'Wolf Tempo Pro',
    subhead: 'Velocidade Diária',
    category: 'velocidade',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=1000',
    weight: 235,
    drop: 6,
    stack: '36mm / 30mm',
    tags: ['Daily Trainer', 'Responsivo', 'Durável'],
    description: 'O melhor dos dois mundos: amortecimento suficiente para rodagens longas e responsividade para quando você quer acelerar. O tênis que faz tudo bem.',
    tech: {
      foam: 'ReactX Foam',
      upper: 'Engineered Mesh 3.0',
    },
    stats: { cushion: 75, responsiveness: 80, stability: 70 }
  }
];
