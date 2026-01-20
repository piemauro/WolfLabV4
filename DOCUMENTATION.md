# WOLF RUNNING LAB — MASTER DOCUMENTATION

> **AI-Optimized Reference Document**
> **Version**: 5.0.0
> **Updated**: 2026-01-20
> **Status**: Production (Alpha)

---

## QUICK REFERENCE

```yaml
project:
  name: Wolf Running Lab
  type: Technical Educational Catalog (NOT e-commerce)
  location: /Users/piemauro/desktop/wolflab
  production: https://wolflab.vercel.app
  github: https://github.com/piemauro/WolfLabV4
  local: http://localhost:5173

commands:
  dev: npm run dev
  build: npm run build
  preview: npm run preview
  deploy: git push origin main  # Auto-deploy via Vercel

credentials:
  openai: VITE_OPENAI_API_KEY (in .env)
  vercel: Auto-deploy from GitHub
```

---

## PROJECT IDENTITY

### Core Concept
Wolf Running Lab is a **technical education hub** disguised as a product catalog. It teaches runners to choose shoes through **biomechanics data**, not marketing.

### Pillars
| Pillar | Description |
|--------|-------------|
| Tech-First | Specs (Drop, Weight, Stack) are protagonists |
| Gamification | RPG-style stat bars (Cushion/Speed/Stability) |
| Dark Mode | "Night Run" aesthetic |
| No Database | All data hardcoded in TypeScript |

---

## TECH STACK

```yaml
core:
  - React 18.2
  - TypeScript 5.3
  - Vite 5.0
  - Tailwind CSS 3.3
  - Lucide React 0.294

apis:
  - OpenAI GPT-4o-mini (Lobinho AI)
  - DeviceMotion API (RunTimer sensors)
  - Web Speech API (Voice input)

deployment:
  - Vercel (auto-deploy on push to main)
```

---

## FILE STRUCTURE

```
wolflab/
├── public/
│   └── logo-wolflab.png              # Official logo
├── src/
│   ├── components/
│   │   ├── Header.tsx                # Fixed navbar + logo + buttons
│   │   ├── ProductCard.tsx           # Product grid cards
│   │   ├── ProductModal.tsx          # Full product details modal
│   │   ├── StatBar.tsx               # Animated performance bars
│   │   ├── ShoeFinder.tsx            # 3-step recommendation wizard
│   │   ├── CompareModal.tsx          # Side-by-side comparison
│   │   ├── CompareSuggestions.tsx    # Smart comparison suggestions
│   │   ├── Lobinho.tsx               # AI Chat assistant UI
│   │   └── RunTimer.tsx              # Shoe testing timer + sensors
│   ├── services/
│   │   └── lobinho.ts                # OpenAI integration
│   ├── data/
│   │   └── products.ts               # ALL products + categories + brands
│   ├── types/
│   │   └── index.ts                  # TypeScript interfaces
│   ├── App.tsx                       # Main component + state management
│   ├── main.tsx                      # React entry point
│   └── index.css                     # Global styles + animations
├── .env                              # API keys (VITE_OPENAI_API_KEY)
├── DOCUMENTATION.md                  # This file
├── ROADMAP.md                        # Future planning
├── README.md                         # Public readme
├── PRODUCT_TEMPLATE.md               # Guide for adding products
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## DATA MODEL

### Product Interface
```typescript
interface Product {
  id: string;                    // "elite-1", "rodagem-1"
  name: string;                  // "Wolf Alphaflyer Elite"
  brand: string;                 // "wolf", "nimbus", "mach", "kayano"
  subhead: string;               // "O Quebrador de Recordes"
  category: 'rodagem' | 'velocidade' | 'elite' | 'estabilidade';
  image: string;                 // URL (Unsplash or local)
  weight: number;                // Grams (size 40/41)
  drop: number;                  // Millimeters
  stack: string;                 // "39.5mm / 31.5mm"
  tags: string[];                // Max 3: ["Placa de Carbono", "Race Day"]
  description: string;           // Technical-emotional (~250 chars)
  tech: {
    foam: string;                // "WolfZ-Pebax Supercritical"
    upper: string;               // "AtomKnit 2.0"
    plate?: string;              // Optional: "FlyPlate Carbono"
  };
  stats: {
    cushion: number;             // 0-100
    responsiveness: number;      // 0-100
    stability: number;           // 0-100
  };
}
```

### Other Types
```typescript
interface Category { id: string; label: string; }
interface Brand { id: string; name: string; }
type ViewType = 'catalog' | 'details' | 'finder' | 'compare';
```

---

## CURRENT CATALOG

### Products (6 total)
| ID | Name | Brand | Category | Weight | Drop |
|----|------|-------|----------|--------|------|
| elite-1 | Wolf Alphaflyer Elite | wolf | elite | 205g | 8mm |
| rodagem-1 | Nimbus Cloud Max | nimbus | rodagem | 290g | 10mm |
| velocidade-1 | Mach Speed 4 | mach | velocidade | 225g | 5mm |
| estabilidade-1 | Kayano Guard 30 | kayano | estabilidade | 305g | 10mm |
| elite-2 | Wolf Prototype X | wolf | elite | 240g | 6mm |
| velocidade-2 | Wolf Tempo Pro | wolf | velocidade | 235g | 6mm |

### Categories
| ID | Label | Use Case |
|----|-------|----------|
| todos | Todos | Show all |
| rodagem | Rodagem | Long runs, recovery, max cushion |
| velocidade | Velocidade | Tempo runs, intervals, light & reactive |
| elite | Elite Day | Races, PRs, carbon plate |
| estabilidade | Estabilidade | Pronation correction, support |

### Brands
| ID | Name |
|----|------|
| todas | Todas |
| wolf | Wolf Lab |
| nimbus | Nimbus |
| mach | Mach |
| kayano | Kayano |

---

## FEATURES

### 1. Product Catalog
- Responsive grid (1/2/3 cols)
- Category + Brand filters
- Cards with preview specs
- Lazy loading images

### 2. ShoeFinder (Wizard)
- 3-step quiz: Level → Goal → Feel
- Returns category recommendation
- Filters catalog automatically

### 3. Product Modal
- Full specs + stat bars
- Tech details (foam, upper, plate)
- Side-by-side layout on desktop
- "Testar na Esteira" button

### 4. Compare Modal
- Up to 3 products side-by-side
- Winner highlighting per stat
- Smart suggestions after adding

### 5. Lobinho (AI Assistant)
- OpenAI GPT-4o-mini
- Text + Voice input (Web Speech API)
- ONLY talks about running shoes
- Recommends exactly 2 products
- Clickable product buttons in responses

### 6. RunTimer (Shoe Testing)
- DeviceMotion API (accelerometer)
- Beginner Mode: Time + Steps + Intensity
- Pro Mode: Pace + Distance + Cadence + Laps
- Custom insights per shoe category
- Post-run summary

---

## STATE MANAGEMENT (App.tsx)

```typescript
// View control
view: ViewType                         // 'catalog' | 'finder' | 'compare'
selectedProduct: Product | null        // Modal product
filter: string                         // Category filter
brandFilter: string                    // Brand filter
isLoading: boolean                     // Initial loading

// Compare feature
compareList: Product[]                 // Max 3 products
showCompareSuggestions: boolean        // Suggestions modal
lastAddedToCompare: Product | null     // Context for suggestions

// AI Assistant
showLobinho: boolean                   // Lobinho modal visibility

// Testing
testingProduct: Product | null         // RunTimer product
recommendedCategory: string | null     // Finder result
```

---

## LOBINHO SERVICE

### Configuration
```typescript
// services/lobinho.ts
model: 'gpt-4o-mini'
temperature: 0.7
max_tokens: 500
```

### System Prompt Rules
1. ONLY talks about running shoes (refuses other topics)
2. Recommends EXACTLY 2 products per query
3. Uses only catalog products (no inventions)
4. Mentions exact product names
5. Explains technical reasons (drop, weight, foam)

### Functions
```typescript
askLobinho(message: string, history: ChatMessage[]): Promise<{
  response: string;
  recommendedProducts: Product[];
}>

getLobinhoGreeting(): string  // Random greeting
```

---

## RUNTIMER DETAILS

### Sensors
```typescript
// DeviceMotion API
window.addEventListener('devicemotion', handleMotion);
// Detects steps when acceleration magnitude > threshold
```

### Calculations
| Metric | Formula |
|--------|---------|
| Cadence | Steps in last 60 seconds |
| Distance | steps × 0.75m (stride length) |
| Pace | time / (distance / 1000) |

### Intensity Zones
| Zone | Cadence |
|------|---------|
| Leve | < 140 |
| Moderado | 140-160 |
| Intenso | 160-180 |
| Máximo | > 180 |

---

## DESIGN SYSTEM

### Colors (Wolf Palette)
| Name | Hex | Usage |
|------|-----|-------|
| Wolf Neon | #8CC63F | Primary, CTAs, highlights |
| Deepest Navy | #050a14 | Main background |
| Card Navy | #0B162A | Cards, sections |
| Pure White | #F3F4F6 | Main text |
| Tech Gray | #9CA3AF | Secondary text |

### Stat Colors
| Stat | Hex |
|------|-----|
| Cushion | #60A5FA (Blue) |
| Responsiveness | #8CC63F (Green) |
| Stability | #F59E0B (Orange) |

### Animations (index.css)
```css
.animate-fade-in       /* Opacity 0→1, 0.3s */
.animate-slide-up      /* Y 100%→0, 0.3s */
.animate-slide-down    /* Y -20px→0, 0.3s */
.animate-scale-in      /* Scale 0.95→1, 0.2s */
.animate-pulse-glow    /* Box-shadow pulse, 2s infinite */
```

---

## HOW TO ADD DATA

### Add Product
```typescript
// src/data/products.ts - Add to PRODUCTS array:
{
  id: 'unique-id',
  name: 'Product Name',
  brand: 'brand-id',        // Must exist in BRANDS
  subhead: 'Marketing tagline',
  category: 'rodagem',      // rodagem|velocidade|elite|estabilidade
  image: 'https://...',
  weight: 250,
  drop: 8,
  stack: '35mm / 27mm',
  tags: ['Tag1', 'Tag2', 'Tag3'],
  description: 'Technical description...',
  tech: {
    foam: 'Foam Name',
    upper: 'Upper Type',
    plate: 'Plate Name'     // Optional
  },
  stats: { cushion: 80, responsiveness: 70, stability: 60 }
}
```

### Add Brand
```typescript
// src/data/products.ts - Add to BRANDS array:
{ id: 'brand-id', name: 'Brand Display Name' }
```

### Add Category
```typescript
// src/data/products.ts - Add to CATEGORIES array:
{ id: 'category-id', label: 'Category Label' }
// Also update Product.category type in types/index.ts
```

---

## VERSION HISTORY

| Version | Date | Features |
|---------|------|----------|
| **5.0.0** | 17 Jan 2026 | Brand filters, combined filtering |
| **4.0.0** | 17 Jan 2026 | RunTimer with DeviceMotion, Beginner/Pro modes |
| **3.0.0** | 17 Jan 2026 | Lobinho AI Assistant, OpenAI integration, Voice input |
| **2.2.0** | 17 Jan 2026 | Official logo, branding update |
| **2.1.0** | 15 Jan 2026 | Smart compare suggestions |
| **2.0.0** | 15 Jan 2026 | Full responsiveness (1/2/3 col grid) |
| **1.5.0** | 15 Jan 2026 | Componentization, Compare modal, A11y |
| **1.0.0** | 15 Jan 2026 | MVP: Catalog, Finder, Modal, Stats |

---

## ROADMAP

### Completed
- [x] V1-V5: MVP → Brand Filters (CURRENT)

### Planned
| Version | Feature | Priority |
|---------|---------|----------|
| V6 | Profile + Gamification (localStorage) | HIGH |
| V7 | Backend + Auth (Supabase) | MEDIUM |
| V8 | GPS + Maps (Geolocation) | MEDIUM |
| V9 | PWA (offline, install) | HIGH |
| V10 | External integrations (Strava export) | LOW |
| V11 | 3D viewer (Three.js) | LOW |

### V6 Details (Profile + Gamification)
```yaml
features:
  - Runner profile (name, level, goal)
  - Saved runs history
  - Accumulated stats (total km, time, steps)
  - Achievement badges:
    - "Primeiro Uivo": First recorded run
    - "Velocista": Cadence 180+ for 5min
    - "Maratonista": 42km accumulated
    - "Relâmpago": Pace under 5 min/km
    - "Fiel": 7 consecutive days running
  - Runner levels (Iniciante → Elite)
  - Day streak counter

storage: localStorage (no backend)
```

---

## TROUBLESHOOTING

### Build fails (TypeScript)
```bash
npx tsc --noEmit  # Check for type errors
```

### Lobinho not responding
1. Check `.env` has `VITE_OPENAI_API_KEY`
2. Verify OpenAI account balance
3. Check browser console for errors

### RunTimer not detecting steps
1. Must be HTTPS (Vercel provides this)
2. Grant sensor permissions
3. Hold phone in hand (not pocket)
4. Works best on mobile devices

### Vercel not updating
1. Verify push completed
2. Check Vercel dashboard for build errors
3. Clear browser cache

---

## DEPLOY PROCESS

```bash
# 1. Make changes
# 2. Test locally
npm run build

# 3. Commit
git add .
git commit -m "Description"

# 4. Push (auto-deploy)
git push origin main

# 5. Wait 1-2 minutes
# 6. Verify at https://wolflab.vercel.app
```

---

## ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                         App.tsx                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    State Management                  │   │
│  │  view | selectedProduct | filter | brandFilter      │   │
│  │  compareList | showLobinho | testingProduct         │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│  ┌─────────────────────────┴─────────────────────────┐     │
│  │                                                    │     │
│  ▼                     ▼                     ▼       │     │
│ Header            Catalog View           Modals      │     │
│  │                    │                     │        │     │
│  ├── Logo             ├── Hero              ├── ProductModal
│  ├── Finder Btn       ├── Category Tabs     ├── ShoeFinder
│  ├── Compare Btn      ├── Brand Filter      ├── CompareModal
│  └── Lobinho Btn      └── ProductCard[]     ├── CompareSuggestions
│                                              ├── Lobinho
│                                              └── RunTimer
└─────────────────────────────────────────────────────────────┘

Data Flow:
User Action → setState → useMemo(filteredProducts) → Render
```

---

## USER FLOWS

### 1. Browse Catalog
```
Home → Filter Category → Filter Brand → Click Product → View Modal
```

### 2. Use Finder
```
Click FINDER → Answer Quiz (3 steps) → See Recommendation → Browse Filtered
```

### 3. Compare Products
```
Click "Comparar" on Card → See Suggestions → Add More → View Comparison
```

### 4. Use Lobinho AI
```
Click LOBINHO → Type/Speak Question → View Recommendations → Click Product
```

### 5. Test Shoe
```
Open Product Modal → Click "Testar na Esteira" → Choose Mode → Run → View Summary
```

---

## KNOWN LIMITATIONS

1. **No persistence**: State resets on refresh
2. **OpenAI dependency**: Lobinho requires valid API key
3. **External images**: Relies on Unsplash (may break)
4. **No backend**: Cannot save user data
5. **Voice input**: Only Chrome/Edge supported

---

## CONTACT

**Project**: Wolf Running Lab
**Location**: `/Users/piemauro/desktop/wolflab`
**Production**: https://wolflab.vercel.app

---

*AI-optimized documentation • Last update: 2026-01-20*
