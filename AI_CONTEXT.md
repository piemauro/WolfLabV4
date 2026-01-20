# WOLF LAB - CONTEXTO COMPLETO PARA IA

> Documento otimizado para leitura por IA. Contem todo o contexto necessario para continuar o desenvolvimento.

---

## META

```yaml
projeto: Wolf Running Lab
tipo: Catalogo tecnico educacional de tenis de corrida
versao_atual: 5.0.0
data_inicio: 15 Jan 2026
ultima_atualizacao: 17 Jan 2026
desenvolvedor: piemauro
assistente_ia: Claude (Anthropic)
```

---

## LOCALIZACAO

```yaml
diretorio_local: /Users/piemauro/Desktop/wolflab
github_repo: https://github.com/piemauro/WolfLabV4
producao_url: https://wolflab.vercel.app
hosting: Vercel (auto-deploy via GitHub main branch)
```

---

## STACK

```yaml
framework: React 18.2
linguagem: TypeScript 5.3
build_tool: Vite 5.0
estilizacao: Tailwind CSS 3.3
icones: Lucide React 0.294
ia_chat: OpenAI GPT-4o-mini
sensores: DeviceMotion API (nativo)
voz: Web Speech API (nativo)
```

---

## COMANDOS

```bash
# Desenvolvimento
cd /Users/piemauro/Desktop/wolflab
npm install          # Instalar dependencias
npm run dev          # Servidor local (http://localhost:5173)
npm run build        # Build producao
npm run preview      # Preview do build

# Deploy
git add .
git commit -m "mensagem"
git push origin main  # Auto-deploy Vercel em 1-2 min

# Verificar tipos
npx tsc --noEmit
```

---

## ESTRUTURA DE ARQUIVOS

```
wolflab/
├── public/
│   └── logo-wolflab.png
├── src/
│   ├── components/
│   │   ├── Header.tsx              # [145 linhas] Navbar: logo, LOBINHO, FINDER, COMPARAR
│   │   ├── ProductCard.tsx         # [120 linhas] Card do produto no grid
│   │   ├── ProductModal.tsx        # [280 linhas] Modal detalhes + botao testar
│   │   ├── ShoeFinder.tsx          # [200 linhas] Quiz 3 perguntas
│   │   ├── CompareModal.tsx        # [350 linhas] Comparador ate 3 produtos
│   │   ├── CompareSuggestions.tsx  # [180 linhas] Sugestoes ao comparar
│   │   ├── Lobinho.tsx             # [250 linhas] Chat IA
│   │   ├── RunTimer.tsx            # [750 linhas] Cronometro com sensores
│   │   └── StatBar.tsx             # [40 linhas] Barra animada de atributo
│   ├── services/
│   │   └── lobinho.ts              # [120 linhas] Integracao OpenAI
│   ├── data/
│   │   └── products.ts             # [200 linhas] Produtos + Categorias + Marcas
│   ├── types/
│   │   └── index.ts                # [45 linhas] Interfaces TypeScript
│   ├── App.tsx                     # [310 linhas] Componente raiz + estados
│   ├── main.tsx                    # [10 linhas] Entry point
│   └── index.css                   # [150 linhas] Tailwind + animacoes custom
├── .env                            # VITE_OPENAI_API_KEY=sk-...
├── AI_CONTEXT.md                   # Este arquivo
├── DOCUMENTATION.md                # Doc detalhada
├── ROADMAP.md                      # Planejamento futuro
├── README.md                       # Doc publica
├── PRODUCT_TEMPLATE.md             # Guia adicionar produtos
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## HISTORICO COMPLETO DE VERSOES

### V1.0.0 - MVP (15 Jan 2026)

```yaml
titulo: MVP Inicial
status: concluido
```

**Implementado:**
- Catalogo com 5 produtos
- Filtro por categoria (Rodagem, Velocidade, Elite, Estabilidade)
- Modal de detalhes do produto
- Finder basico (quiz 3 perguntas: nivel, objetivo, sensacao)
- Barras de stats animadas (cushion, responsiveness, stability)
- Design dark mode completo
- App.tsx monolitico (tudo em um arquivo)

**Produtos iniciais:**
1. Wolf Cloud X (Rodagem)
2. Wolf Racer Pro (Elite)
3. Nimbus Comfort 26 (Rodagem)
4. Mach Speed 4 (Velocidade)
5. Kayano Stability 30 (Estabilidade)

---

### V1.5.0 - Componentizacao (15 Jan 2026)

```yaml
titulo: Refatoracao em Componentes
status: concluido
```

**Implementado:**
- Separacao em componentes isolados (8 arquivos)
- Logo oficial Wolf Lab
- Comparador lado a lado (ate 3 produtos)
- +1 produto: Wolf Tempo Pro (Velocidade)
- Lazy loading de imagens
- Acessibilidade: ARIA labels, focus states
- Semantica HTML: header, main, section, article

**Arquivos criados:**
```
src/components/Header.tsx
src/components/ProductCard.tsx
src/components/ProductModal.tsx
src/components/ShoeFinder.tsx
src/components/CompareModal.tsx
src/components/StatBar.tsx
```

---

### V2.0.0 - Responsividade (15 Jan 2026)

```yaml
titulo: Layout Responsivo Completo
status: concluido
```

**Implementado:**
- Grid responsivo:
  - Mobile (<768px): 1 coluna
  - Tablet (768-1024px): 2 colunas
  - Desktop (>1024px): 3 colunas
- Modal centralizado no desktop
- ProductModal: layout lado a lado em desktop
- Header responsivo com logo maior
- Finder como modal centralizado
- Backdrop clicavel para fechar modais

**Classes Tailwind usadas:**
```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
```

---

### V2.1.0 - Comparador Inteligente (15 Jan 2026)

```yaml
titulo: Sugestoes Automaticas no Comparador
status: concluido
```

**Implementado:**
- Modal de sugestoes ao adicionar produto para comparar
- Algoritmo de recomendacao:
  - Mesma categoria: +3 pontos
  - Peso similar (+-30g): +2 pontos
  - Stats proximos: +1 ponto cada
- Fluxo: Clicar Comparar -> Ver Sugestoes -> Adicionar -> Ver Comparacao

**Arquivo criado:**
```
src/components/CompareSuggestions.tsx
```

---

### V2.2.0 - Logo Oficial (17 Jan 2026)

```yaml
titulo: Branding Atualizado
status: concluido
```

**Implementado:**
- Logos processados: removido espaco em branco (480x390 -> 388x179)
- "Lab Specialized Shoes" integrado ao logo
- Versoes: logo-wolflab-preto.png, logo-wolflab-branco.png
- Header com logo completo
- Loading screen com novo logo
- Corrigida imagem do Mach Speed 4

---

### V3.0.0 - Lobinho Assistente IA (17 Jan 2026)

```yaml
titulo: Chat Inteligente com OpenAI
status: concluido
```

**Implementado:**
- Assistente virtual "Lobinho" com GPT-4o-mini
- Input por texto OU voz (Web Speech API)
- EXCLUSIVO para perguntas sobre tenis de corrida
- Sempre recomenda exatamente 2 opcoes do catalogo
- Explica tecnicamente cada recomendacao
- Produtos mencionados viram botoes clicaveis
- Recusa educadamente assuntos fora do escopo
- Botao LOBINHO no header

**Arquivos criados:**
```
src/components/Lobinho.tsx
src/services/lobinho.ts
```

**Configuracao necessaria:**
```env
# .env
VITE_OPENAI_API_KEY=sk-proj-...
```

**System Prompt resumido:**
```
Voce e Lobinho, especialista em tenis de corrida do Wolf Lab.
- APENAS responde sobre tenis de corrida
- Conhece o catalogo completo (6 produtos)
- Sempre recomenda EXATAMENTE 2 opcoes
- Menciona nome exato dos produtos
- Explica tecnicamente (drop, peso, foam, placa)
- Recusa educadamente outros assuntos
```

**Integracao OpenAI:**
```typescript
// src/services/lobinho.ts
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [...],
    max_tokens: 500,
    temperature: 0.7
  })
});
```

---

### V4.0.0 - Cronometro Inteligente (17 Jan 2026)

```yaml
titulo: Sensores do Celular para Teste
status: concluido
```

**Implementado:**
- Cronometro com DeviceMotion API
- **Modo Iniciante:**
  - Timer grande
  - Contador de passos
  - Intensidade (Leve/Moderado/Intenso/Maximo)
- **Modo Pro:**
  - Pace (min/km)
  - Distancia estimada
  - Cadencia (passos/min)
  - Sistema de voltas/laps com historico
- Deteccao de passos via acelerometro
- Usuario segura celular na mao
- Insights personalizados por categoria do tenis
- Tela de resumo pos-corrida
- Permissao de sensores (iOS/Android)

**Arquivo criado:**
```
src/components/RunTimer.tsx
```

**Acesso:** Botao "Testar na Esteira" no ProductModal

**Logica de deteccao de passos:**
```typescript
window.addEventListener('devicemotion', (event) => {
  const acc = event.accelerationIncludingGravity;
  const magnitude = Math.sqrt(acc.x**2 + acc.y**2 + acc.z**2);
  if (magnitude > STEP_THRESHOLD && timeSinceLastStep > MIN_STEP_INTERVAL) {
    stepCount++;
  }
});
```

**Calculos:**
```typescript
cadencia = passos_ultimo_minuto;
distancia = passos * 0.75; // metros (stride length medio)
pace = (tempo_ms / 60000) / (distancia / 1000); // min/km
```

**Zonas de intensidade:**
```typescript
if (cadencia < 140) return 'Leve';
if (cadencia < 160) return 'Moderado';
if (cadencia < 180) return 'Intenso';
return 'Maximo';
```

**Requisitos:**
- HTTPS obrigatorio (Vercel fornece)
- Permissao de sensores
- Funciona melhor em mobile

---

### V5.0.0 - Filtros por Marca (17 Jan 2026)

```yaml
titulo: Filtro por Marca no Catalogo
status: concluido
versao_atual: true
```

**Implementado:**
- Filtro por marca no catalogo
- Marcas: Wolf Lab, Nimbus, Mach, Kayano
- Filtros combinados (categoria + marca)
- Campo `brand` em todos os produtos
- Botao "Limpar filtros" quando sem resultados

**Arquivos modificados:**
```
src/data/products.ts  -> BRANDS array + campo brand nos produtos
src/types/index.ts    -> interface Brand
src/App.tsx           -> brandFilter state + UI
```

**Codigo adicionado em App.tsx:**
```typescript
const [brandFilter, setBrandFilter] = useState('todas');

const filteredProducts = useMemo(() => {
  return PRODUCTS.filter(p => {
    const matchCategory = filter === 'todos' || p.category === filter;
    const matchBrand = brandFilter === 'todas' || p.brand === brandFilter;
    return matchCategory && matchBrand;
  });
}, [filter, brandFilter]);
```

---

## DADOS DO CATALOGO

### PRODUTOS (6 total)

```typescript
// src/data/products.ts

export const PRODUCTS: Product[] = [
  {
    id: 'wolf-cloud-x',
    name: 'Wolf Cloud X',
    brand: 'wolf',
    subhead: 'Nuvem tecnologica para longas distancias',
    category: 'rodagem',
    image: 'https://images.unsplash.com/...',
    weight: 285,
    drop: 10,
    stack: '38mm / 28mm',
    tags: ['Maratona', 'Recuperacao', 'Conforto'],
    description: 'O Wolf Cloud X redefine o conceito de amortecimento...',
    tech: {
      foam: 'CloudTec Elite',
      upper: 'Mesh Engenhado 3D',
    },
    stats: {
      cushion: 95,
      responsiveness: 70,
      stability: 80
    }
  },
  {
    id: 'wolf-racer-pro',
    name: 'Wolf Racer Pro',
    brand: 'wolf',
    category: 'elite',
    weight: 195,
    drop: 8,
    // ... placa de carbono
    stats: { cushion: 65, responsiveness: 98, stability: 60 }
  },
  {
    id: 'nimbus-comfort-26',
    name: 'Nimbus Comfort 26',
    brand: 'nimbus',
    category: 'rodagem',
    weight: 310,
    drop: 10,
    stats: { cushion: 98, responsiveness: 60, stability: 85 }
  },
  {
    id: 'mach-speed-4',
    name: 'Mach Speed 4',
    brand: 'mach',
    category: 'velocidade',
    weight: 215,
    drop: 6,
    stats: { cushion: 60, responsiveness: 92, stability: 65 }
  },
  {
    id: 'kayano-stability-30',
    name: 'Kayano Stability 30',
    brand: 'kayano',
    category: 'estabilidade',
    weight: 305,
    drop: 10,
    stats: { cushion: 88, responsiveness: 65, stability: 98 }
  },
  {
    id: 'wolf-tempo-pro',
    name: 'Wolf Tempo Pro',
    brand: 'wolf',
    category: 'velocidade',
    weight: 225,
    drop: 6,
    stats: { cushion: 70, responsiveness: 90, stability: 70 }
  }
];
```

### CATEGORIAS

```typescript
export const CATEGORIES: Category[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'rodagem', label: 'Rodagem' },        // Treino longo, conforto
  { id: 'velocidade', label: 'Velocidade' },  // Tiros, fartlek
  { id: 'elite', label: 'Elite' },            // Provas, carbono
  { id: 'estabilidade', label: 'Estabilidade' } // Pronadores
];
```

### MARCAS

```typescript
export const BRANDS: Brand[] = [
  { id: 'todas', name: 'Todas' },
  { id: 'wolf', name: 'Wolf Lab' },
  { id: 'nimbus', name: 'Nimbus' },
  { id: 'mach', name: 'Mach' },
  { id: 'kayano', name: 'Kayano' }
];
```

---

## TYPES (src/types/index.ts)

```typescript
export interface Product {
  id: string;
  name: string;
  brand: string;
  subhead: string;
  category: 'rodagem' | 'velocidade' | 'elite' | 'estabilidade';
  image: string;
  weight: number;      // gramas
  drop: number;        // mm
  stack: string;       // ex: "38mm / 28mm"
  tags: string[];
  description: string;
  tech: {
    foam: string;
    upper: string;
    plate?: string;    // opcional, so para elite
  };
  stats: {
    cushion: number;        // 0-100
    responsiveness: number; // 0-100
    stability: number;      // 0-100
  };
}

export interface Category {
  id: string;
  label: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface FinderAnswer {
  level?: string;
  goal?: string;
  feel?: string;
}

export type ViewType = 'catalog' | 'details' | 'finder' | 'compare';
```

---

## ESTADOS DO APP (src/App.tsx)

```typescript
// View control
const [view, setView] = useState<ViewType>('catalog');

// Product selection
const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

// Filters
const [filter, setFilter] = useState('todos');           // categoria
const [brandFilter, setBrandFilter] = useState('todas'); // marca

// Loading
const [isLoading, setIsLoading] = useState(true);

// Compare
const [compareList, setCompareList] = useState<Product[]>([]);
const [showCompareSuggestions, setShowCompareSuggestions] = useState(false);
const [lastAddedToCompare, setLastAddedToCompare] = useState<Product | null>(null);

// Finder
const [recommendedCategory, setRecommendedCategory] = useState<string | null>(null);

// Lobinho (IA)
const [showLobinho, setShowLobinho] = useState(false);

// RunTimer (cronometro)
const [testingProduct, setTestingProduct] = useState<Product | null>(null);
```

---

## PALETA DE CORES

```css
/* Principais */
--wolf-neon: #8CC63F;      /* Verde - primaria, CTAs */
--deepest-navy: #050a14;   /* Background principal */
--card-navy: #0B162A;      /* Cards, secoes */
--pure-white: #F3F4F6;     /* Texto principal */
--tech-gray: #9CA3AF;      /* Texto secundario */

/* Stats */
--cushion-blue: #60A5FA;   /* Amortecimento */
--response-green: #8CC63F; /* Responsividade */
--stability-orange: #F59E0B; /* Estabilidade */
```

---

## ROADMAP FUTURO

### V6.0.0 - Perfil + Gamificacao

```yaml
status: planejado
armazenamento: localStorage (sem banco)
```

**Features:**
- Perfil do corredor (nome, nivel, objetivo)
- Dashboard de estatisticas
- Tenis favorito do usuario
- Sistema de badges/conquistas (11 badges)
- Historico de corridas salvo
- Estatisticas acumuladas (km, tempo, passos)
- Niveis: Iniciante -> Intermediario -> Avancado -> Elite
- Streak de dias corridos
- Corridas salvas automaticamente do cronometro

**Badges planejados:**
```
Primeiro Uivo    - Primeira corrida
Velocista        - Cadencia 180+ por 5 min
Maratonista      - 42km acumulados
Relampago        - Pace < 5 min/km
Fiel             - 7 dias seguidos
Colecionador     - 3 tenis testados
Elite            - Nivel maximo
Noturno          - Correr apos 20h
Madrugador       - Correr antes 6h
Centuriao        - 100 corridas
Pro Mode         - Usar modo pro
```

**Estrutura localStorage:**
```
wolflab_user_profile  -> { name, level, goal, favoriteShoe }
wolflab_runs          -> [{ id, date, time, steps, cadence, shoe }]
wolflab_badges        -> [{ id, name, unlockedAt }]
wolflab_stats         -> { totalKm, totalTime, totalRuns, streak }
```

---

### V7.0.0 - Backend + Sincronizacao

```yaml
status: futuro
tecnologia_sugerida: Supabase
```

**Features:**
- Banco de dados
- Autenticacao de usuarios
- Sincronizar dados entre dispositivos
- Ranking/Leaderboard global
- Perfis publicos

---

### V8.0.0 - GPS + Mapas

```yaml
status: futuro
apis: Geolocation API, Mapbox ou Leaflet
```

**Features:**
- Distancia real via GPS
- Tracar rota no mapa
- Pace por km com grafico
- Elevacao do percurso

---

### V9.0.0 - PWA

```yaml
status: futuro
```

**Features:**
- Instalar como app nativo
- Funcionar offline (Service Worker)
- Push notifications
- Cache do catalogo

---

### V10.0.0 - Integracoes Externas

```yaml
status: avaliando
```

**Features:**
- Upload para Strava (nao download - restricoes legais)
- Exportar GPX/TCX
- Compartilhar Instagram Stories
- QR Code para lojas fisicas

---

### V11.0.0 - Visualizacao 3D

```yaml
status: sonho
tecnologia: Three.js
```

**Features:**
- Modelo 3D do tenis
- Rotacao 360
- Zoom em detalhes
- AR (Realidade Aumentada)

---

## DESCARTADO

| Feature | Motivo |
|---------|--------|
| Integracao Strava (download) | Aprovacao incerta, restricoes legais, nao pode usar dados na IA |
| Agenda de testes em loja | Sistema de agendamento muito complexo |
| E-commerce | Fora do escopo educacional |

---

## TROUBLESHOOTING

### Build falha TypeScript
```bash
npx tsc --noEmit  # Ver erros
# Comum: imports nao usados, tipos faltando
```

### Lobinho nao responde
1. Verificar .env tem VITE_OPENAI_API_KEY
2. Verificar saldo OpenAI
3. Ver console do browser

### Cronometro nao detecta passos
1. Precisa HTTPS (Vercel OK)
2. Dar permissao sensores
3. Segurar celular na mao
4. Melhor em mobile

### Vercel nao atualiza
1. Verificar git push
2. Ver dashboard Vercel
3. Limpar cache browser

---

## INSTRUCOES PARA IA CONTINUAR

1. **Ler este arquivo** para contexto completo
2. **Verificar ROADMAP.md** para proximas features
3. **Rodar `npm run dev`** para desenvolvimento
4. **Testar `npm run build`** antes de commit
5. **Push para main** faz deploy automatico

**Arquivos-chave para modificar:**
- Novos componentes: `src/components/`
- Novos servicos: `src/services/`
- Dados/produtos: `src/data/products.ts`
- Tipos: `src/types/index.ts`
- Logica principal: `src/App.tsx`

**Padrao de commit:**
```
Tipo: Descricao curta

- Detalhe 1
- Detalhe 2

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
```

---

## RESUMO EXECUTIVO

```
Wolf Lab e um catalogo tecnico de tenis de corrida.
Versao atual: 5.0.0 (Filtros por Marca)
Stack: React + TypeScript + Vite + Tailwind
Producao: https://wolflab.vercel.app
GitHub: https://github.com/piemauro/WolfLabV4
Local: /Users/piemauro/Desktop/wolflab

Features atuais:
- Catalogo 6 produtos
- Filtros categoria + marca
- Comparador inteligente
- Lobinho (chat IA)
- Cronometro com sensores
- Finder (quiz)

Proxima versao (V6): Perfil + Gamificacao com localStorage
```

---

*Documento gerado: 17 Jan 2026 | Wolf Running Lab*
