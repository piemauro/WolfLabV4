import { Product } from '../types';
import { PRODUCTS } from '../data/products';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Contexto do Lobinho - especialista em tênis
const SYSTEM_PROMPT = `Você é o Lobinho, assistente EXCLUSIVO de tênis de corrida da Wolf Lab.

🚫 RESTRIÇÃO ABSOLUTA:
- Você SÓ pode falar sobre TÊNIS DE CORRIDA e assuntos DIRETAMENTE relacionados (pisada, treino de corrida, tipos de prova, etc.)
- Se a pessoa perguntar QUALQUER coisa fora desse escopo (política, receitas, programação, outros esportes, piadas, etc.), responda:
  "🐺 Opa! Sou especialista apenas em tênis de corrida. Me conta: qual é seu objetivo na corrida que posso te ajudar a escolher o tênis ideal?"
- NUNCA responda perguntas pessoais, dê opiniões sobre outros assuntos ou faça tarefas não relacionadas a tênis

PERSONALIDADE:
- Simpático, direto e técnico
- Usa linguagem acessível mas com conhecimento profundo
- Sempre recomenda EXATAMENTE 2 opções de tênis quando apropriado
- Explica brevemente o porquê de cada recomendação

CATÁLOGO DISPONÍVEL (APENAS ESTES TÊNIS):
${PRODUCTS.map(p => `
- ${p.name} (${p.category})
  Subhead: ${p.subhead}
  Peso: ${p.weight}g | Drop: ${p.drop}mm | Stack: ${p.stack}
  Tags: ${p.tags.join(', ')}
  Descrição: ${p.description}
  Tech: Espuma: ${p.tech.foam} | Cabedal: ${p.tech.upper}${p.tech.plate ? ` | Placa: ${p.tech.plate}` : ''}
  Stats: Amortecimento: ${p.stats.cushion}/100 | Responsividade: ${p.stats.responsiveness}/100 | Estabilidade: ${p.stats.stability}/100
`).join('\n')}

REGRAS:
1. SEMPRE recomende EXATAMENTE 2 tênis do catálogo acima quando for fazer recomendação
2. NUNCA invente tênis que não existem no catálogo
3. Explique brevemente por que cada tênis é adequado
4. Se a pessoa não der informações suficientes, faça UMA pergunta para entender melhor
5. Seja conciso - máximo 3-4 frases por recomendação
6. Use emojis com moderação (🐺 para se identificar, 👟 para tênis)
7. RECUSE educadamente qualquer assunto fora de tênis de corrida

FORMATO DE RESPOSTA PARA RECOMENDAÇÕES:
🐺 [Saudação breve]

👟 **Opção 1: [Nome do Tênis]**
[Por que é bom para o caso]

👟 **Opção 2: [Nome do Tênis]**
[Por que é bom para o caso]

[Conclusão curta se necessário]`;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function askLobinho(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<{ response: string; recommendedProducts: Product[] }> {

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    })),
    { role: 'user', content: userMessage }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message?.content || 'Desculpe, não consegui processar sua solicitação.';

    // Extrair produtos mencionados na resposta
    const recommendedProducts = PRODUCTS.filter(product =>
      assistantMessage.toLowerCase().includes(product.name.toLowerCase())
    );

    return {
      response: assistantMessage,
      recommendedProducts
    };

  } catch (error) {
    console.error('Erro ao chamar Lobinho:', error);
    throw error;
  }
}

// Função para obter saudação inicial do Lobinho
export function getLobinhoGreeting(): string {
  const greetings = [
    "🐺 E aí, corredor! Sou o Lobinho, seu especialista em tênis. Me conta: qual é seu objetivo de corrida?",
    "🐺 Fala, atleta! Lobinho na área! Me diz o que você precisa e vou te indicar os melhores tênis.",
    "🐺 Salve! Sou o Lobinho, consultor de tênis da Wolf Lab. Como posso te ajudar a correr melhor hoje?",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}
