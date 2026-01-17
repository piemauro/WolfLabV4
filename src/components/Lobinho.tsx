import { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, MicOff, Volume2, Loader2, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { askLobinho, getLobinhoGreeting, ChatMessage } from '../services/lobinho';

interface LobinhoProps {
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function Lobinho({ onClose, onSelectProduct }: LobinhoProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: getLobinhoGreeting() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Configurar Speech Recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'pt-BR';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('Seu navegador não suporta reconhecimento de voz');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      setError(null);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText.trim();
    setInputText('');
    setError(null);

    // Adicionar mensagem do usuário
    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { response, recommendedProducts: products } = await askLobinho(
        userMessage,
        messages
      );

      setMessages([...newMessages, { role: 'assistant', content: response }]);
      setRecommendedProducts(products);

    } catch (err) {
      setError('Ops! Não consegui processar. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end md:items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full h-[85vh] md:h-[80vh] md:max-w-lg bg-[#050a14] rounded-t-3xl md:rounded-3xl border-t md:border border-white/10 shadow-2xl flex flex-col animate-slide-up overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <header className="p-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8CC63F] to-emerald-600 flex items-center justify-center shadow-lg shadow-[#8CC63F]/30">
              <span className="text-2xl">🐺</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Lobinho</h2>
              <p className="text-xs text-[#8CC63F]">Especialista em tênis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-[#8CC63F] text-[#050a14]'
                    : 'bg-[#0B162A] text-white border border-white/5'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[#0B162A] rounded-2xl px-4 py-3 border border-white/5">
                <div className="flex items-center gap-2 text-[#8CC63F]">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm">Lobinho pensando...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-500/20 text-red-400 rounded-xl px-4 py-2 text-sm">
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Produtos Recomendados */}
        {recommendedProducts.length > 0 && (
          <div className="px-4 pb-2 shrink-0">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Produtos mencionados</p>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {recommendedProducts.map(product => (
                <button
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="flex items-center gap-2 bg-[#0B162A] border border-white/10 rounded-xl p-2 pr-3 hover:border-[#8CC63F]/50 transition-colors shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div className="text-left">
                    <p className="text-xs font-bold text-white truncate max-w-[120px]">{product.name}</p>
                    <p className="text-[10px] text-gray-400">{product.weight}g</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-500" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleListening}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
              }`}
              title={isListening ? 'Parar gravação' : 'Falar'}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isListening ? 'Ouvindo...' : 'Digite ou fale sua dúvida...'}
              className="flex-1 bg-[#0B162A] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#8CC63F]/50"
              disabled={isLoading}
            />

            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className="w-12 h-12 rounded-full bg-[#8CC63F] text-[#050a14] flex items-center justify-center hover:bg-[#7ab32e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>

          <p className="text-[10px] text-gray-600 text-center mt-2">
            Powered by OpenAI • Especialista em tênis Wolf Lab
          </p>
        </div>
      </div>
    </div>
  );
}
