// Wolf Running Lab - Type Definitions

export interface Product {
  id: string;
  name: string;
  brand: string;
  subhead: string;
  category: 'rodagem' | 'velocidade' | 'elite' | 'estabilidade';
  image: string;
  weight: number;
  drop: number;
  stack: string;
  tags: string[];
  description: string;
  tech: {
    foam: string;
    upper: string;
    plate?: string;
  };
  stats: {
    cushion: number;
    responsiveness: number;
    stability: number;
  };
}

export interface Category {
  id: string;
  label: string;
  icon?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
}

export interface FinderAnswer {
  level?: string;
  goal?: string;
  feel?: string;
}

export type ViewType = 'catalog' | 'details' | 'finder' | 'compare';
