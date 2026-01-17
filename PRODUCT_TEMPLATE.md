# WOLF RUNNING LAB - Template de Produto

Use este documento como guia para adicionar novos modelos de tênis ao catálogo.

---

## Estrutura de Dados Obrigatória

Cada produto deve seguir **exatamente** esta interface TypeScript:

```typescript
{
  id: string;              // Identificador único (ex: "elite-3", "rodagem-2")
  name: string;            // Nome completo do modelo
  subhead: string;         // Tagline de marketing (máx. 25 caracteres)
  category: string;        // 'rodagem' | 'velocidade' | 'elite' | 'estabilidade'
  image: string;           // URL da imagem (Unsplash ou local)
  weight: number;          // Peso em gramas (tamanho 40/41 masculino)
  drop: number;            // Drop em milímetros
  stack: string;           // Altura da entressola "XXmm / XXmm"
  tags: string[];          // Array com 2-3 tags descritivas
  description: string;     // Texto técnico-emocional (150-250 caracteres)
  tech: {
    foam: string;          // Nome/tecnologia da espuma
    upper: string;         // Tipo de cabedal/malha
    plate?: string;        // Placa (opcional - apenas se tiver)
  };
  stats: {
    cushion: number;       // Amortecimento (0-100)
    responsiveness: number; // Retorno de energia (0-100)
    stability: number;     // Estabilidade (0-100)
  };
}
```

---

## Guia de Preenchimento

### 1. ID (`id`)
- **Formato**: `{categoria}-{número}`
- **Exemplos**: `elite-1`, `rodagem-3`, `velocidade-2`
- **Regra**: Deve ser único em todo o catálogo

### 2. Nome (`name`)
- **Formato**: Nome comercial completo
- **Exemplos**: "Wolf Alphaflyer Elite", "Nimbus Cloud Max"
- **Dica**: Incluir marca + linha + versão se aplicável

### 3. Subhead (`subhead`)
- **Formato**: Frase de impacto curta
- **Máximo**: 25 caracteres
- **Exemplos**:
  - "O Quebrador de Recordes"
  - "Rodagem de Luxo"
  - "Suporte Inteligente"
- **Objetivo**: Resumir a proposta de valor em uma frase

### 4. Categoria (`category`)
Escolha **uma** das opções:

| Categoria | Quando usar | Perfil do corredor |
|-----------|-------------|-------------------|
| `rodagem` | Treinos longos, recuperação, alto volume | Qualquer nível, foco em conforto |
| `velocidade` | Treinos de ritmo, tiros, fartlek | Intermediário a avançado |
| `elite` | Provas, recordes pessoais, race day | Competidores |
| `estabilidade` | Pronação, suporte, correção de pisada | Pronadores, iniciantes |

### 5. Imagem (`image`)
- **Fonte recomendada**: Unsplash (gratuito, alta qualidade)
- **Formato da URL**: `https://images.unsplash.com/photo-XXXXX?auto=format&fit=crop&q=80&w=1000`
- **Proporção ideal**: 4:3 ou 1:1
- **Dica**: Buscar por "running shoes", "sneakers", "athletic footwear"

### 6. Peso (`weight`)
- **Unidade**: Gramas (g)
- **Referência**: Tamanho 40/41 masculino
- **Range típico por categoria**:
  - Elite: 180-220g
  - Velocidade: 220-250g
  - Rodagem: 260-300g
  - Estabilidade: 280-320g

### 7. Drop (`drop`)
- **Unidade**: Milímetros (mm)
- **Definição**: Diferença de altura entre calcanhar e antepé
- **Ranges típicos**:
  - Low drop (minimalista): 0-4mm
  - Médio: 5-8mm
  - Alto (tradicional): 9-12mm

### 8. Stack (`stack`)
- **Formato**: "XXmm / XXmm" (calcanhar / antepé)
- **Exemplos**:
  - "39.5mm / 31.5mm" (high stack)
  - "32mm / 27mm" (médio)
  - "25mm / 20mm" (low stack)

### 9. Tags (`tags`)
- **Quantidade**: 2-3 tags
- **Formato**: Array de strings
- **Exemplos de tags por categoria**:

| Categoria | Tags sugeridas |
|-----------|---------------|
| Elite | "Placa de Carbono", "Race Day", "Super Foam", "Recorde Pessoal" |
| Velocidade | "Tempo Run", "Tiros", "Leveza", "Versátil", "Daily Trainer" |
| Rodagem | "Max Cushion", "Recuperação", "Conforto", "Longo Prazo", "Durável" |
| Estabilidade | "Pronação", "Suporte", "Estruturado", "Guia de Pisada" |

### 10. Descrição (`description`)
- **Tamanho**: 150-250 caracteres
- **Tom**: Técnico-emocional (dados + benefício)
- **Estrutura sugerida**:
  1. Propósito do tênis
  2. Tecnologia principal
  3. Benefício para o corredor

**Exemplo**:
> "Engenharia pura focada em economia de energia. A geometria agressiva da placa de carbono te impulsiona para frente, enquanto a espuma WolfZ-Pebax oferece o maior retorno de energia do mercado."

### 11. Tech (`tech`)
Especificações técnicas dos materiais:

```typescript
tech: {
  foam: string;    // OBRIGATÓRIO - Nome da tecnologia de espuma
  upper: string;   // OBRIGATÓRIO - Tipo de cabedal
  plate?: string;  // OPCIONAL - Apenas se tiver placa
}
```

**Exemplos de espumas**:
- "WolfZ-Pebax Supercritical"
- "Nitro-Infused EVA"
- "ProFly+ Dual Density"
- "ReactX Foam"
- "Gel-Tech + 4D Guidance"

**Exemplos de cabedal**:
- "AtomKnit 2.0"
- "Engineered Mesh"
- "Creel Mesh Mono"
- "Plush Jacquard Mesh"

**Exemplos de placas** (se aplicável):
- "FlyPlate Carbono Total"
- "Dual Carbon Blades"
- "Pebax Energy Plate"

### 12. Stats (`stats`)
Atributos de performance em escala 0-100:

```typescript
stats: {
  cushion: number;       // Amortecimento
  responsiveness: number; // Retorno de energia
  stability: number;     // Estabilidade
}
```

**Guia de calibração**:

| Atributo | 0-30 | 31-60 | 61-80 | 81-100 |
|----------|------|-------|-------|--------|
| Cushion | Firme/Racing | Equilibrado | Macio | Max Cushion |
| Responsiveness | Absorvente | Neutro | Reativo | Bouncy/Propulsivo |
| Stability | Neutro/Livre | Leve guia | Moderado | Controle total |

**Perfis típicos por categoria**:

| Categoria | Cushion | Responsiveness | Stability |
|-----------|---------|----------------|-----------|
| Elite | 60-80 | 90-100 | 30-50 |
| Velocidade | 55-75 | 75-90 | 55-70 |
| Rodagem | 85-100 | 40-60 | 70-85 |
| Estabilidade | 75-90 | 35-55 | 90-100 |

---

## Exemplo Completo

```typescript
{
  id: 'elite-3',
  name: 'Wolf VaporMax Pro',
  subhead: 'Zero Limite',
  category: 'elite',
  image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1000',
  weight: 195,
  drop: 8,
  stack: '40mm / 32mm',
  tags: ['Placa de Carbono', 'Race Day', 'Recorde Pessoal'],
  description: 'Desenvolvido para quebrar barreiras. A nova geometria da placa em carbono cria um efeito catapulta que reduz em 4% o custo energético. Para corredores que não aceitam segundo lugar.',
  tech: {
    foam: 'ZoomX Pebax',
    upper: 'VaporWeave Ultralight',
    plate: 'Full Carbon FlyPlate'
  },
  stats: { cushion: 65, responsiveness: 98, stability: 35 }
}
```

---

## Onde Adicionar

Abra o arquivo `src/data/products.ts` e adicione o novo produto ao array `PRODUCTS`:

```typescript
export const PRODUCTS: Product[] = [
  // ... produtos existentes ...

  // ADICIONE AQUI:
  {
    id: 'seu-novo-produto',
    // ... resto dos dados
  }
];
```

---

## Checklist de Validação

Antes de adicionar, verifique:

- [ ] ID é único (não existe outro igual)
- [ ] Categoria é válida ('rodagem' | 'velocidade' | 'elite' | 'estabilidade')
- [ ] Imagem carrega corretamente
- [ ] Tags são 2-3 itens
- [ ] Descrição tem 150-250 caracteres
- [ ] Stats estão entre 0-100
- [ ] Stats fazem sentido para a categoria
- [ ] Stack está no formato "XXmm / XXmm"

---

## Dicas de Curadoria

1. **Equilíbrio do catálogo**: Tente manter ~25% de cada categoria
2. **Variedade de stats**: Evite produtos com stats idênticos
3. **Imagens consistentes**: Prefira fotos com fundo limpo e ângulo similar
4. **Nomenclatura**: Mantenha padrão (Marca + Linha + Versão/Adjetivo)

---

*WOLF RUNNING LAB - Catálogo Técnico v2.0*
