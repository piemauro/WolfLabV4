# WOLF LAB — ROADMAP

> Planejamento de evolucao do catalogo tecnico de tenis de corrida.

---

## Versoes Lancadas

### V1.0.0 — MVP
- Catalogo com 5 produtos
- Filtro por categoria
- Modal de detalhes
- Finder basico (quiz 3 perguntas)
- Barras de stats animadas
- Design dark mode

### V1.5.0 — Componentizacao
- Separacao em componentes isolados
- Logo oficial implementado
- Comparador lado a lado
- +1 produto (Wolf Tempo Pro)
- Lazy loading de imagens
- Acessibilidade (ARIA labels)

### V2.0.0 — Responsividade
- Grid 1/2/3 colunas (mobile/tablet/desktop)
- Modal centralizado no desktop
- Layout lado a lado no ProductModal
- Header responsivo

### V2.1.0 — Comparador Inteligente
- Modal de sugestoes ao comparar
- Algoritmo de recomendacao (categoria, peso, stats)

### V2.2.0 — Logo Oficial
- Logos processados e otimizados
- "Lab Specialized Shoes" integrado

### V3.0.0 — Lobinho (Assistente IA)
- Chat com OpenAI GPT-4o-mini
- Input por texto ou voz (Web Speech API)
- Especialista EXCLUSIVO em tenis de corrida
- Recomenda 2 opcoes do catalogo
- Produtos clicaveis na resposta

### V4.0.0 — Cronometro Inteligente
- Sensores do celular (DeviceMotion API)
- Modo Iniciante e Modo Pro
- Deteccao de passos via acelerometro
- Cadencia, pace, distancia estimada
- Sistema de voltas/laps
- Insights baseados no tenis testado
- Resumo pos-corrida

### V5.0.0 — Filtros por Marca

**Status:** Concluido — 17 Jan 2026

- [x] Adicionar campo `brand` aos produtos
- [x] Filtro por marca no catalogo
- [x] Filtros combinados (marca + categoria)

---

## Futuro (Backlog)

### V6.0.0 — Perfil + Gamificacao (localStorage)

#### 6.1 Perfil do Corredor
- [ ] Perfil do corredor (nome, nivel, objetivo)
- [ ] Dashboard de estatisticas
- [ ] "Tenis favorito" do usuario

#### 6.2 Gamificacao
- [ ] Sistema de conquistas/badges
- [ ] Historico de corridas salvo
- [ ] Estatisticas acumuladas (km total, tempo, passos)
- [ ] Niveis de corredor (Iniciante -> Elite)
- [ ] Streak de dias corridos
- [ ] Corridas salvas automaticamente do cronometro

**Armazenamento:** 100% local (localStorage) — sem banco de dados

### V7.0.0 — Backend + Sincronizacao
- [ ] Banco de dados (Supabase)
- [ ] Autenticacao de usuarios
- [ ] Sincronizar dados entre dispositivos
- [ ] Ranking/Leaderboard global
- [ ] Perfis publicos

### V8.0.0 — GPS + Mapas
- [ ] Geolocation API para distancia real
- [ ] Tracar rota no mapa (Mapbox/Leaflet)
- [ ] Pace por km com grafico
- [ ] Elevacao do percurso

### V9.0.0 — PWA
- [ ] Instalar como app nativo
- [ ] Funcionar offline (Service Worker)
- [ ] Push notifications
- [ ] Cache do catalogo

### V10.0.0 — Integracoes Externas
- [ ] Upload para Strava (nao download)
- [ ] Exportar GPX/TCX
- [ ] Compartilhar no Instagram Stories
- [ ] QR Code para lojas fisicas

### V11.0.0 — Visualizacao 3D
- [ ] Three.js para modelo 3D do tenis
- [ ] Rotacao 360
- [ ] Zoom em detalhes
- [ ] AR (Realidade Aumentada) para "experimentar"

---

## Priorizacao

| Versao | Impacto | Esforco | Prioridade |
|--------|---------|---------|------------|
| V5 (Filtros) | Medio | Baixo | Concluido |
| V6 (Gamificacao) | Alto | Medio | Proximo |
| V7 (Backend) | Alto | Alto | Futuro |
| V8 (GPS) | Medio | Medio | Futuro |
| V9 (PWA) | Alto | Baixo | Futuro |
| V10 (Integracoes) | Medio | Alto | Avaliando |
| V11 (3D) | Wow factor | Alto | Sonho |

---

## Descartado / Em Espera

| Feature | Motivo |
|---------|--------|
| Integracao Strava (download) | Processo de aprovacao incerto, restricoes legais |
| Agenda de testes em loja | Requer sistema de agendamento complexo |
| E-commerce | Fora do escopo educacional |

---

## Notas Tecnicas

### Stack Atual
- React 18.2 + TypeScript 5.3
- Vite 5.0
- Tailwind CSS 3.3
- OpenAI API (Lobinho)
- DeviceMotion API (Cronometro)
- Web Speech API (Voz)

### Badges Planejados (V6)
| Badge | Condicao |
|-------|----------|
| Primeiro Uivo | Primeira corrida registrada |
| Velocista | Cadencia 180+ por 5 min |
| Maratonista | 42km acumulados |
| Relampago | Pace abaixo de 5 min/km |
| Fiel | 7 dias seguidos correndo |
| Colecionador | Testar 3 tenis diferentes |
| Elite | Atingir nivel maximo |

---

*Ultima atualizacao: 17 Jan 2026*
