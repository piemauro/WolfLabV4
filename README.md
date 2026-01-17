# 🐺 WOLF RUNNING LAB

> Catálogo técnico imersivo para corredores que levam performance a sério.

---

## O que é

**Wolf Running Lab** é um hub educacional disfarçado de catálogo. Não vendemos tênis — ensinamos corredores a escolher o modelo certo através de **dados técnicos**, não marketing.

---

## Como Funciona

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   CORREDOR                                                                  │
│      │                                                                      │
│      ▼                                                                      │
│   ┌──────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────┐           │
│   │  FINDER  │─▶│   CATÁLOGO   │─▶│   COMPARAR   │  │ LOBINHO  │           │
│   │ (Quiz)   │  │  (Produtos)  │  │  (Análise)   │  │   (IA)   │           │
│   └──────────┘  └──────────────┘  └──────────────┘  └──────────┘           │
│        │                │                 │               │                 │
│        ▼                ▼                 ▼               ▼                 │
│   Recomendação     Raio-X do        Lado a lado      Assistente            │
│   personalizada    tênis            com vencedores   Especialista          │
│                         │                                                   │
│                         ▼                                                   │
│                  ┌──────────────┐                                           │
│                  │  CRONÔMETRO  │ ◀── Sensores do celular                  │
│                  │  INTELIGENTE │     (segurar na mão)                     │
│                  └──────────────┘                                           │
│                         │                                                   │
│                         ▼                                                   │
│                  Insights baseados                                          │
│                  no tênis testado                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Pilares

| Pilar | Descrição |
|-------|-----------|
| **Tech-First** | Dados técnicos (Drop, Peso, Stack) são protagonistas |
| **Gamificação** | Barras de status estilo RPG (Cushion, Speed, Stability) |
| **Dark Mode** | Estética "Night Run", alto contraste, foco no produto |

---

## Stack Tecnológico

| Tech | Versão | Função |
|------|--------|--------|
| React | 18.2 | UI Components |
| TypeScript | 5.3 | Tipagem |
| Vite | 5.0 | Build & Dev Server |
| Tailwind CSS | 3.3 | Estilização |
| Lucide | 0.294 | Ícones |
| OpenAI API | GPT-4o-mini | Assistente Lobinho (v3) |
| Web Speech API | Native | Reconhecimento de voz (v3) |
| DeviceMotion API | Native | Sensores do celular (v4) |

---

## Estrutura do Projeto

```
wolflab/
├── public/
│   └── logo-wolflab.png         # Logo oficial processado
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Navbar com logo + botões
│   │   ├── ProductCard.tsx      # Card de produto
│   │   ├── ProductModal.tsx     # Modal de detalhes
│   │   ├── ShoeFinder.tsx       # Quiz de recomendação
│   │   ├── CompareModal.tsx     # Comparador lado a lado
│   │   ├── CompareSuggestions.tsx # Sugestões ao comparar
│   │   ├── Lobinho.tsx          # Assistente IA (v3)
│   │   ├── RunTimer.tsx         # Cronômetro inteligente (v4)
│   │   └── StatBar.tsx          # Barra de atributo
│   ├── services/
│   │   └── lobinho.ts           # Integração OpenAI (v3)
│   ├── data/
│   │   └── products.ts          # Produtos + Tema
│   ├── types/
│   │   └── index.ts             # Interfaces TypeScript
│   ├── App.tsx                  # App principal
│   ├── main.tsx                 # Entry point
│   └── index.css                # Estilos + Animações
├── .env                         # Chave API OpenAI
├── PRODUCT_TEMPLATE.md          # Guia para adicionar produtos
├── README.md                    # Este arquivo
├── package.json
└── tailwind.config.js
```

---

## Funcionalidades

### 1. Catálogo
- Grid responsivo (1/2/3 colunas)
- Filtro por categoria
- Cards com preview de specs
- Lazy loading de imagens

### 2. Finder (Quiz)
- 3 perguntas: Nível → Objetivo → Sensação
- Algoritmo de recomendação
- Filtra catálogo automaticamente

### 3. Modal de Produto
- Layout lado a lado (desktop)
- Barras de performance animadas
- Specs técnicos completos
- Botão "Testar na Esteira"

### 4. Comparador
- Até 3 produtos simultâneos
- Sugestões inteligentes ao adicionar
- Destaque do "vencedor" por atributo
- Resumo automático

### 5. Lobinho (Assistente IA) — v3
- Chat com GPT-4o-mini especializado
- Input por texto ou voz (Web Speech API)
- EXCLUSIVO para perguntas sobre tênis de corrida
- Sempre recomenda 2 opções do catálogo
- Explica tecnicamente cada recomendação
- Produtos mencionados viram botões clicáveis
- Recusa educadamente assuntos fora do escopo

### 6. Cronômetro Inteligente — v4
- **Modo Iniciante**: Timer grande, passos, cadência, intensidade
- **Modo Pro**: Stats completos + sistema de voltas
- Sensores do celular (segurar na mão enquanto corre)
- Detecção automática de passos via acelerômetro
- Cálculo de cadência, pace e distância estimada
- Insights personalizados baseados no tênis:
  - Análise de placa de carbono para Elite
  - Recomendação de cadência por categoria
  - Feedback de amortecimento para Rodagem
- Resumo completo ao finalizar corrida

---

## Categorias de Produto

| Categoria | Propósito | Perfil |
|-----------|-----------|--------|
| 🏃 **Rodagem** | Treinos longos, recuperação | Conforto máximo |
| ⚡ **Velocidade** | Tiros, fartlek, tempo run | Leve e reativo |
| 🏆 **Elite** | Provas, recordes pessoais | Placa de carbono |
| 🛡️ **Estabilidade** | Correção de pisada | Pronadores |

---

## Paleta de Cores

| Nome | Hex | Uso |
|------|-----|-----|
| Wolf Neon | `#8CC63F` | Primária, CTAs, Destaques |
| Deepest Navy | `#050a14` | Background principal |
| Card Navy | `#0B162A` | Cards, seções |
| Pure White | `#F3F4F6` | Texto principal |
| Tech Gray | `#9CA3AF` | Texto secundário |

**Cores de Stats:**
- Amortecimento: `#60A5FA` (Azul)
- Responsividade: `#8CC63F` (Verde)
- Estabilidade: `#F59E0B` (Laranja)

---

## Comandos

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

---

## Como Adicionar Produtos

Ver **[PRODUCT_TEMPLATE.md](./PRODUCT_TEMPLATE.md)** para guia completo.

**Resumo rápido:**
1. Abra `src/data/products.ts`
2. Adicione objeto ao array `PRODUCTS`
3. Siga a interface `Product`
4. Salve → Hot reload atualiza

---

## Changelog

### v4.0.0 — 17 Jan 2026
**Cronômetro Inteligente - Testar na Esteira**
- ✅ Cronômetro com sensores do celular (DeviceMotion API)
- ✅ **Modo Iniciante**: Interface simplificada com tempo, passos e intensidade
- ✅ **Modo Pro**: Stats completos com pace, distância, cadência e voltas
- ✅ Detecção de passos via acelerômetro (segurar celular na mão)
- ✅ Cálculo de cadência em tempo real (passos/minuto)
- ✅ Estimativa de distância baseada em stride length
- ✅ Zonas de intensidade (Leve → Máximo)
- ✅ Sistema de voltas/laps com histórico
- ✅ **Insights personalizados** baseados no tênis selecionado:
  - Feedback técnico sobre placa de carbono
  - Análise de cadência ideal por categoria
  - Recomendações de intensidade
  - Stats do tênis vs performance
- ✅ Tela de resumo pós-corrida com análise completa
- ✅ Solicitação de permissão para sensores (iOS/Android)
- ✅ Novo componente `src/components/RunTimer.tsx`

### v3.0.0 — 17 Jan 2026
**Lobinho - Assistente IA**
- ✅ Novo assistente virtual "Lobinho" com OpenAI GPT-4o-mini
- ✅ Input por texto ou voz (Web Speech API)
- ✅ Especialista nos tênis do catálogo
- ✅ Sempre recomenda exatamente 2 opções
- ✅ Explica o porquê de cada recomendação
- ✅ Produtos mencionados aparecem como botões clicáveis
- ✅ Botão no header para acessar o Lobinho
- ✅ Novo serviço `src/services/lobinho.ts`
- ✅ Novo componente `src/components/Lobinho.tsx`

### v2.2.0 — 17 Jan 2026
**Logo Oficial WOLF LAB**
- ✅ Logos processados: removido espaço em branco (480x390 → 388x179)
- ✅ Título: "Lab" + "Specialized Shoes" integrado ao logo
- ✅ Versões: `logo-wolflab-preto.png` e `logo-wolflab-branco.png`
- ✅ Header atualizado com logo completo
- ✅ Loading screen com novo logo
- ✅ Corrigida imagem do Mach Speed 4

### v2.1.0 — 15 Jan 2026
**Comparador Inteligente**
- ✅ Modal de sugestões ao clicar em comparar
- ✅ Algoritmo de recomendação (categoria, peso, stats)
- ✅ Fluxo: Adicionar → Sugestões → Ver Comparação

### v2.0.0 — 15 Jan 2026
**Responsividade Total**
- ✅ Grid 1/2/3 colunas (mobile/tablet/desktop)
- ✅ Modal centralizado no desktop
- ✅ Layout lado a lado no ProductModal
- ✅ Header responsivo com logo maior
- ✅ Finder como modal centralizado
- ✅ Backdrop clickable para fechar modais

### v1.5.0 — 15 Jan 2026
**Componentização**
- ✅ Separação em componentes isolados
- ✅ Logo oficial implementado
- ✅ Comparador lado a lado
- ✅ Finder com lógica aprimorada
- ✅ +1 produto adicionado (Wolf Tempo Pro)
- ✅ Lazy loading de imagens
- ✅ Semântica HTML (header, main, section, article)
- ✅ Acessibilidade (ARIA labels, focus states)

### v1.0.0 — 15 Jan 2026
**MVP Inicial**
- ✅ Catálogo com 5 produtos
- ✅ Filtro por categoria
- ✅ Modal de detalhes
- ✅ Finder básico (3 perguntas)
- ✅ Barras de stats animadas
- ✅ Design dark mode

---

## Roadmap Futuro

| Feature | Status |
|---------|--------|
| Assistente IA (Lobinho) | ✅ v3.0.0 |
| Cronômetro Inteligente | ✅ v4.0.0 |
| Visualizador 3D (Three.js) | 🔮 Planejado |
| PWA (offline) | 🔮 Planejado |
| Integração GPS real | 🔮 Planejado |
| Mais produtos | 🔄 Contínuo |

---

## Contato

**WOLF RUNNING LAB**
Engenharia para sua performance.

---

*Última atualização: 17 Jan 2026 — v4.0.0*
