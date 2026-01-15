import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
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

const USTAZA_SYSTEM_INSTRUCTION = `You are "Ustaza", a friendly, patient, and encouraging Spanish language tutor. 
Your goal is to help users learn and practice Spanish in a fun and conversational way.
- Keep your responses concise and easy to understand for beginners.
- Use a mix of English and Spanish, explaining concepts clearly.
- Encourage the user and praise their efforts.
- When asked a question, provide a direct answer and then try to engage the user with a related question to keep the conversation going.
- Use emojis to make the conversation more engaging. 👍🎉📚
- Never break character. You are always Ustaza.`;

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState<Chat | null>(null);
  const [micLang, setMicLang] = useState('es-ES');
  const [ustazaExpression, setUstazaExpression] = useState<MascotExpression>('idle');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition(micLang);

  useEffect(() => {
    const initChat = () => {
      setIsLoading(true);
      try {
        if (!process.env.API_KEY) throw new Error("API_KEY not set.");
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatSession = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: { systemInstruction: USTAZA_SYSTEM_INSTRUCTION },
        });
        setChat(chatSession);
        setMessages([
          { id: 1, text: '¡Hola! Soy Ustaza. Ready to practice some Spanish? 🇪🇸', sender: 'bot' },
        ]);
      } catch (error) {
        setMessages([{ id: 1, text: "I'm having trouble connecting right now! 🛠️", sender: 'bot' }]);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
    return () => { if (window.speechSynthesis) window.speechSynthesis.cancel(); }
  }, []);

  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };
  useEffect(scrollToBottom, [messages]);
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES';
      window.speechSynthesis.cancel();
      setUstazaExpression('talking');
      utterance.onend = () => setUstazaExpression('idle');
      window.speechSynthesis.speak(utterance);
    }
  };

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
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "Oops! My bad. Try again?", sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((text) => setInput(prev => prev + (prev ? ' ' : '') + text));
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-lg mx-auto">
      <div className="flex items-center gap-4 mb-6 px-2">
        <Mascot size={70} expression={ustazaExpression} />
        <div>
          <h1 className="text-2xl font-black text-brand-text leading-none uppercase tracking-tight">Ustaza AI</h1>
          <p className="text-[10px] font-bold text-brand-green uppercase mt-1 tracking-widest">Online • Your Tutor</p>
        </div>
      </div>
      
      <div className="flex-grow bg-white border-2 border-brand-stroke rounded-3xl p-6 overflow-y-auto space-y-5 shadow-sm">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {msg.sender === 'bot' && (
                 <div className="flex-shrink-0 mb-1">
                    <Mascot size={32} expression="collapsed" />
                 </div>
            )}
            <div className={`max-w-[80%] px-5 py-3 rounded-2xl border-b-4 font-bold text-sm ${
              msg.sender === 'user' 
                ? 'bg-brand-blue text-white border-brand-blue-dark rounded-br-none' 
                : 'bg-brand-snow text-brand-text border-brand-stroke rounded-bl-none'
            }`}>
              {msg.text === '' && msg.sender === 'bot' ? <TypingIndicator /> : <p className="leading-relaxed">{msg.text}</p>}
            </div>
            {msg.sender === 'bot' && msg.text && (
                 <button onClick={() => speak(msg.text)} className="p-2 text-gray-400 hover:text-brand-blue transition-colors self-center bg-gray-50 rounded-full">
                     <SpeakerIcon className="w-4 h-4"/>
                 </button>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-6 flex gap-3 items-center">
        {isSupported && (
            <button 
              className={`p-4 rounded-2xl transition-all border-b-4 ${isListening ? 'bg-brand-red text-white border-[#D13B3B]' : 'bg-brand-snow text-brand-text border-brand-stroke'}`}
              onClick={handleMicClick}
            >
                {isListening ? <StopIcon className="w-6 h-6 animate-pulse" /> : <MicrophoneIcon className="w-6 h-6" />}
            </button>
        )}
        <div className="flex-grow">
            <input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder={isListening ? "Listening..." : "Type your message..."}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading || !chat}
                className={`w-full bg-white border-2 border-brand-stroke border-b-4 rounded-2xl px-5 py-4 font-bold text-sm focus:outline-none focus:border-brand-blue transition-all ${isListening ? "border-brand-red" : ""}`}
            />
        </div>
        <Button onClick={handleSend} size="md" disabled={isLoading || !chat || !input.trim()} className="h-[58px]">
            Send
        </Button>
      </div>
    </div>
  );
};