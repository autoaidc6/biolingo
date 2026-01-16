import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DEBATE_TOPICS } from '../constants';
import { Button } from '../components/ui/Button';
import { GoogleGenAI, Chat } from '@google/genai';
import { SpeakerIcon, MicrophoneIcon, StopIcon } from '../components/ui/Icons';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { Mascot, MascotExpression } from '../components/ui/Mascot';

const TypingIndicator = () => (
  <div className="flex items-center space-x-1.5 p-3 bg-gray-100 rounded-2xl w-fit">
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
  </div>
);

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

export const DebateSessionPage: React.FC = () => {
  const { id, side } = useParams<{ id: string, side: string }>();
  const navigate = useNavigate();
  const topic = DEBATE_TOPICS.find(t => t.id === id);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState<Chat | null>(null);
  const [ustazaExpression, setUstazaExpression] = useState<MascotExpression>('idle');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition('es-ES');

  useEffect(() => {
    if (!topic) return;

    const systemInstruction = `You are "Ustaza", a high-level academic debate judge and opponent.
Topic of debate: "${topic.title}" - ${topic.description}
The user has chosen to argue ${side === 'for' ? 'FOR' : 'AGAINST'} this idea.
Your goal is to take the OPPOSITE position (${side === 'for' ? 'AGAINST' : 'FOR'}) and engage in a formal, respectful, and challenging Spanish debate.
- Always respond in Spanish, but you can provide brief English translations for complex terms.
- Use strong counter-arguments.
- Correct any major grammatical errors the user makes in Spanish.
- Keep responses relatively brief (max 100 words).
- Start the debate by introducing yourself as the opponent and stating your opening stance.`;

    const initChat = async () => {
      setIsLoading(true);
      try {
        if (!process.env.API_KEY) throw new Error("API_KEY not set.");
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatSession = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: { systemInstruction },
        });
        setChat(chatSession);

        // Initial greeting
        const intro = `¡Hola! Soy tu oponente Ustaza. Hoy debatiremos sobre "${topic.title}". Tú estás ${side === 'for' ? 'a favor' : 'en contra'}. Comencemos. Mi posición es la contraria... ¿qué argumentos tienes para empezar?`;
        setMessages([{ id: 1, text: intro, sender: 'bot' }]);
      } catch (error) {
        setMessages([{ id: 1, text: "No puedo conectar para el debate ahora mismo. 🛠️", sender: 'bot' }]);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
  }, [topic, side]);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(scrollToBottom, [messages]);
  
  const handleSend = async () => {
    if (input.trim() === '' || !chat || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setUstazaExpression('thinking');

    try {
      const stream = await chat.sendMessageStream({ message: input });
      let botResponse = '';
      const botMessageId = Date.now() + 1;
      setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);
      
      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: botResponse } : msg
        ));
      }
      setUstazaExpression('happy');
      setTimeout(() => setUstazaExpression('idle'), 2000);
    } catch (error) {
      setUstazaExpression('idle');
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Hubo un error en mi respuesta. ¿Podrías repetir?", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) stopListening();
    else startListening((text) => setInput(prev => prev + (prev ? ' ' : '') + text));
  };

  if (!topic) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-2xl mx-auto px-4">
      <header className="flex items-center justify-between mb-6">
        <button onClick={() => navigate(-1)} className="text-slate-400 font-black flex items-center gap-2">← BACK</button>
        <div className="text-right">
          <h2 className="text-sm font-black text-brand-purple uppercase tracking-widest">{topic.title}</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase">You: {side === 'for' ? 'Pro' : 'Con'}</p>
        </div>
      </header>
      
      <div className="flex-grow bg-white border-2 border-brand-stroke rounded-[40px] p-8 overflow-y-auto space-y-6 shadow-sm border-b-[8px]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`max-w-[85%] px-6 py-4 rounded-[32px] font-bold text-sm leading-relaxed ${
              msg.sender === 'user' 
                ? 'bg-brand-blue text-white rounded-br-none border-b-4 border-brand-blue-dark' 
                : 'bg-brand-snow text-brand-text border-brand-stroke border-2 border-b-4 rounded-bl-none'
            }`}>
              {msg.text === '' ? <TypingIndicator /> : msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-8 flex gap-3 items-center">
        {isSupported && (
            <button 
              className={`p-5 rounded-[20px] transition-all border-b-4 ${isListening ? 'bg-brand-red text-white border-[#D13B3B]' : 'bg-brand-snow text-brand-text border-brand-stroke'}`}
              onClick={handleMicClick}
            >
                {isListening ? <StopIcon className="w-6 h-6 animate-pulse" /> : <MicrophoneIcon className="w-6 h-6" />}
            </button>
        )}
        <div className="flex-grow">
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder={isListening ? "Listening..." : "Present your argument..."}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading}
                className={`w-full bg-white border-2 border-brand-stroke border-b-8 rounded-[20px] px-6 py-5 font-bold text-sm focus:outline-none focus:border-brand-blue transition-all`}
            />
        </div>
        <Button onClick={handleSend} size="md" disabled={isLoading || !input.trim()} className="h-[68px] px-8 bg-brand-purple">
            SEND
        </Button>
      </div>
    </div>
  );
};