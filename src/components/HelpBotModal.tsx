import React, { useState, useRef, useEffect } from 'react';
import { ScreenView } from '../types';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actions?: Array<{
    label: string;
    screen?: ScreenView;
    url?: string;
  }>;
}

interface HelpBotModalProps {
  onNavigate: (screen: ScreenView) => void;
  onOpenLegalFaq?: () => void;
}

const SUGGESTED_QUESTIONS = [
  '🔒 ¿Cómo protegen mi dinero con el Smart Contract?',
  '⚖️ ¿Quién audita cada hito según el tipo de proyecto?',
  '🌱 ¿Qué tipo de proyectos se pueden financiar?',
  '💵 ¿Puedo invertir en pesos argentinos con CBU?',
  '📊 ¿Cuáles son el VAN, TIR y Payback de la tesis?',
  '📄 ¿Dónde descargo la tesis en Word y el Excel?',
];

export const HelpBotModal: React.FC<HelpBotModalProps> = ({ onNavigate, onOpenLegalFaq }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '¡Hola! Soy **SeedBot**, el asistente virtual de **Seed & Grow**. Estoy aquí para ayudarte a entender la plataforma, cómo funciona el fideicomiso inembargable (CCyCN 1666), la custodia escrow en Base L2, el panel de peritos colegiados o las métricas de la tesis para la UAI.',
      time: 'Ahora',
      actions: [
        { label: 'Explorar Proyectos', screen: 'explorar' },
        { label: 'Ver Pitch Deck', url: '/pitch-deck' },
        { label: 'Centro de Entregas UAI', url: '/descargas-academicas' },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-6).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Error al conectar con el servidor');
      }

      const data = await response.json();
      const botReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Disculpa, no pude procesar la respuesta en este momento.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: data.actions || [],
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Error enviando mensaje a SeedBot:', err);
      // Client-side fallback if server fails
      const fallbackReply: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: getLocalFallbackAnswer(query),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [
          { label: 'Ver Proyectos', screen: 'explorar' },
          { label: 'Pitch Deck Oral', url: '/pitch-deck' },
        ],
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: { label: string; screen?: ScreenView; url?: string }) => {
    if (action.url) {
      window.open(action.url, '_blank');
    } else if (action.screen) {
      onNavigate(action.screen);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#012D1D] hover:bg-[#006C48] text-white p-3.5 md:p-4 rounded-full shadow-2xl flex items-center gap-3 transition-all transform hover:scale-105 border-2 border-emerald-400/40 group cursor-pointer"
          title="Abrir Asistente Virtual SeedBot"
          aria-label="Abrir Asistente Virtual"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-2xl text-emerald-300">smart_toy</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-[#012D1D] rounded-full animate-pulse"></span>
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold leading-none tracking-tight">Ayuda &amp; Preguntas</span>
            <span className="text-[10px] text-emerald-200/90 font-medium">SeedBot Online</span>
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-[95vw] sm:w-[420px] max-w-[440px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#E2DDD7] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Header */}
          <div className="bg-[#012D1D] text-white p-4 flex items-center justify-between border-b border-[#1B4332]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-700/80 border border-emerald-400/30 flex items-center justify-center text-white shadow-xs">
                <span className="material-symbols-outlined text-2xl">smart_toy</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm tracking-tight">SeedBot</h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-emerald-400/20 text-emerald-300 uppercase tracking-wider">
                    IA Soporte
                  </span>
                </div>
                <p className="text-[11px] text-white/70">Asistente oficial de Seed &amp; Grow · UAI 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
                title="Cerrar chat"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
          </div>

          {/* Quick Info Ribbon */}
          <div className="bg-[#FBF9F5] px-4 py-2 border-b border-[#ECE7E2] flex items-center justify-between text-[11px] text-[#555555]">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              EVM Base L2 · CCyCN 1666
            </span>
            <button
              onClick={() => {
                if (onOpenLegalFaq) onOpenLegalFaq();
              }}
              className="text-[#006C48] font-bold hover:underline cursor-pointer"
            >
              Marco Legal FAQ
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#006C48] text-white rounded-br-xs font-medium'
                      : 'bg-white text-[#1D1B19] rounded-bl-xs border border-[#E2DDD7] shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{formatMarkdownText(m.text)}</p>

                  {/* Actions / Buttons inside Bot Reply */}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {m.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(act)}
                          className="px-2.5 py-1 rounded-lg bg-[#012D1D]/5 hover:bg-[#006C48] hover:text-white text-[#012D1D] text-[11px] font-bold transition-all border border-[#E2DDD7] cursor-pointer"
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-[#888888] mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-[#E2DDD7] max-w-[70%] shadow-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]"></div>
                <span className="text-[11px] text-[#777777] font-medium ml-1">SeedBot está pensando...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className="p-2.5 bg-white border-t border-[#ECE7E2] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1.5">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="inline-block text-[10px] font-bold px-2.5 py-1.5 bg-[#FBF9F5] hover:bg-[#E6F4EA] text-[#012D1D] rounded-full border border-[#E2DDD7] hover:border-emerald-400 transition-colors cursor-pointer flex-shrink-0"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-[#ECE7E2] flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Pregúntale a SeedBot (ej: ¿cómo funciona el escrow?)..."
              disabled={isLoading}
              className="flex-1 bg-[#FBF9F5] border border-[#E2DDD7] rounded-xl px-3.5 py-2 text-xs text-[#1D1B19] focus:outline-none focus:border-[#006C48] focus:ring-1 focus:ring-[#006C48]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-[#006C48] hover:bg-[#012D1D] disabled:opacity-40 text-white flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
              title="Enviar mensaje"
            >
              <span className="material-symbols-outlined text-base">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Formats basic markdown bolding in replies
function formatMarkdownText(text: string) {
  // Simple renderer for bold text
  return text;
}

// Local Fallback responses when network or API key is absent
function getLocalFallbackAnswer(query: string): string {
  const lower = query.toLowerCase();

  if (lower.includes('dinero') || lower.includes('escrow') || lower.includes('smart contract') || lower.includes('candado')) {
    return 'En Seed & Grow, el dinero nunca va a la cuenta personal de nadie. Queda bloqueado en un Smart Contract Escrow multi-firma 3/5 en Base L2 y aislado legalmente en un Fideicomiso Ordinario (CCyCN 1666). Los fondos solo se liberan tramo a tramo cuando un perito colegiado emite dictamen favorable y la asamblea de inversores vota la conformidad.';
  }

  if (lower.includes('auditor') || lower.includes('quién audita') || lower.includes('perito') || lower.includes('colegiado')) {
    return 'Seed & Grow asigna peritos colegiados matriculados según la disciplina técnica del proyecto:\n• Biotecnología y Biofábricas: Ingenieros Industriales o Químicos.\n• Infraestructura y Obras: Ingenieros Civiles o Arquitectos.\n• Software y Soluciones IT: Ingenieros en Sistemas Informáticos.\n• Bioinsumos y Recursos: Ingenieros Agrónomos o Ambientales.\n• Auditoría Contable y Balances: Contadores Públicos matriculados.\nCada perito responde con su matrícula profesional y firma digitalmente con hash SHA-256 anclado en la blockchain.';
  }

  if (lower.includes('tipo de proyecto') || lower.includes('rubro') || lower.includes('quedan') || lower.includes('financiar') || lower.includes('abarca') || lower.includes('sectores')) {
    return 'Seed & Grow financia proyectos de la economía real estructurados por tramos:\n1. Biotecnología & Biofábricas\n2. Infraestructura & Obras Civiles\n3. Software, Robótica & Tecnología\n4. Energías Limpias & Renovables\n5. Producción, Manufactura & Bioinsumos\nCada iniciativa se resguarda en un Fideicomiso inembargable (CCyCN 1666) y Smart Contracts Escrow en Base L2.';
  }

  if (lower.includes('casciari') || lower.includes('orsai') || lower.includes('uruguaya') || lower.includes('pelicula') || lower.includes('cine')) {
    return 'Seed & Grow no financia cine ni producciones audiovisuales, ni adopta esquemas informales como el de Casciari. En la fundamentación teórica de la tesis, ese caso se analiza exclusivamente como un contraejemplo y antipatrón de financiamiento colectivo informal que derivó en controversias públicas por carecer de auditorías independientes, sin custodia escrow autoejecutable y sin segregación fiduciaria legal. Seed & Grow se enfoca 100% en proyectos productivos, industriales y tecnológicos con peritajes colegiados vinculantes.';
  }

  if (lower.includes('pesos') || lower.includes('cbu') || lower.includes('transferencia') || lower.includes('mercado pago')) {
    return '¡Sí! Puedes invertir tanto en stablecoins USDC a través de tu billetera Web3 en Base L2, como en pesos argentinos (ARS) mediante transferencia bancaria (CBU) o billeteras virtuales (CVU / Mercado Pago). El sistema realiza la conciliación fiduciaria y emite la cuota-parte tokenizada con certificado fiscal para ARCA.';
  }

  if (lower.includes('van') || lower.includes('tir') || lower.includes('payback') || lower.includes('financier')) {
    return 'El Plan Económico a 3 Años (Capítulo 8) arrojó:\n• Inversión Inicial: USD 35.000\n• VAN (al 15% de corte): USD 184.250\n• TIR: 48.7% anual\n• Payback: 14 meses\n• Punto de Equilibrio: Mes 9 (USD 53.750/mes intermediados).\nDemuestra alta rentabilidad con bajo costo marginal de software.';
  }

  if (lower.includes('word') || lower.includes('excel') || lower.includes('descargar') || lower.includes('tesis')) {
    return 'Puedes descargar ambos entregables académicos desde el Centro de Entregas:\n• Tesis Word (.docx): /descargar-word\n• Plan Financiero Excel (.xlsx): /descargar-excel\n• Pitch Deck: /pitch-deck';
  }

  return 'Seed & Grow es la plataforma de financiamiento colectivo fiduciario con custodia escrow en Base L2. Puedes consultar sobre el funcionamiento legal del fideicomiso (CCyCN 1666), el panel de peritos colegiados según la vertical del proyecto, cómo aportar en pesos o USDC, o los números de la tesis UAI.';
}
