import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GoogleGenAI, Chat } from '@google/genai';
import { SpeakerIcon, MicrophoneIcon, StopIcon } from '../components/ui/Icons';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

// Simple typing indicator component
const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
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

const USTAZA_SYSTEM_INSTRUCTION = `You are "Ustaza AI", a friendly, patient, and encouraging Spanish language tutor. 
Your goal is to help users learn and practice Spanish in a fun and conversational way.
- Keep your responses concise and easy to understand for beginners.
- Use a mix of English and Spanish, explaining concepts clearly. For example, when teaching a word, provide the Spanish word, its English translation, and an example sentence.
- Encourage the user and praise their efforts.
- When asked a question, provide a direct answer and then try to engage the user with a related question to keep the conversation going.
- Use emojis to make the conversation more engaging. 👍🎉📚
- Never break character. You are always Ustaza AI.`;

const chatAreaStyle = {
    backgroundImage: 'radial-gradient(#d4d4d4 1px, transparent 1px)',
    backgroundSize: '16px 16px',
};

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState<Chat | null>(null);
  const [micLang, setMicLang] = useState('es-ES');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition(micLang);

  useEffect(() => {
    const initChat = () => {
      setIsLoading(true);
      try {
        if (!process.env.API_KEY) {
          throw new Error("API_KEY environment variable not set.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const chatSession = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: USTAZA_SYSTEM_INSTRUCTION,
          },
        });
        setChat(chatSession);
        setMessages([
          { id: 1, text: '¡Hola! Soy Ustaza AI. Ask me anything about Spanish! 🇪🇸', sender: 'bot' },
        ]);
      } catch (error) {
        console.error("Failed to initialize chat:", error);
        let errorMessage = 'Sorry, I couldn\'t connect to my brain right now. Please try again later.';
        if (error instanceof Error && error.message.includes("API_KEY")) {
            errorMessage = 'It looks like I\'m not configured correctly. I can\'t chat right now, sorry! 🛠️';
        }
        setMessages([
          { id: 1, text: errorMessage, sender: 'bot' },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    initChat();
    
    return () => {
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-ES'; // Set language to Spanish for better pronunciation
      window.speechSynthesis.cancel(); // Stop any currently speaking utterance
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser doesn't support text-to-speech.");
    }
  };


  const handleSend = async () => {
    if (input.trim() === '' || !chat || isLoading) return;

    const userMessage: Message = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const stream = await chat.sendMessageStream({ message: input });
      
      let botResponse = '';
      const botMessageId = Date.now() + 1;

      // Add a placeholder for the bot message to start streaming into
      setMessages(prev => [...prev, { id: botMessageId, text: '', sender: 'bot' }]);
      
      for await (const chunk of stream) {
        botResponse += chunk.text;
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId ? { ...msg, text: botResponse } : msg
        ));
      }

    } catch (error) {
      console.error("Error sending message:", error);
       // Remove the empty bot message placeholder on error, if it exists
       setMessages(prev => prev.filter(msg => msg.text !== '' || msg.sender !== 'bot'));
      const errorMessage: Message = { id: Date.now() + 1, text: "Oops! Something went wrong. Please try again.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      const startVal = input;
      startListening((text) => {
         // Append spoken text to what was already there, handling spaces intelligently
         const separator = startVal && !startVal.endsWith(' ') && text ? ' ' : '';
         setInput(startVal + separator + text);
      });
    }
  };

  const toggleMicLang = () => {
    setMicLang(prev => prev === 'es-ES' ? 'en-US' : 'es-ES');
  };

  return (
    <div className="flex flex-col h-[85vh]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-brand-text">Chat with Ustaza AI</h1>
      </div>
      
      <div style={chatAreaStyle} className="flex-grow bg-white border-2 border-brand-stroke rounded-2xl p-4 overflow-y-auto space-y-4 shadow-inner">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && msg.text && (
                 <button onClick={() => speak(msg.text)} title="Read aloud" className="p-1 text-gray-400 hover:text-brand-blue transition-colors self-center flex-shrink-0">
                     <SpeakerIcon className="w-5 h-5"/>
                 </button>
            )}
            <div className={`max-w-[85%] lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${msg.sender === 'user' ? 'bg-brand-blue text-white rounded-br-lg' : 'bg-gray-100 text-brand-text rounded-bl-lg'}`}>
              {msg.text === '' && msg.sender === 'bot' ? <TypingIndicator /> : <p className="whitespace-pre-wrap">{msg.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="mt-4 flex gap-2 items-end">
        {isSupported && (
            <div className="flex flex-col gap-1 pb-0.5">
                 <div className={`flex bg-white border-2 rounded-xl overflow-hidden h-[54px] transition-colors ${isListening ? 'border-red-400 ring-2 ring-red-100' : 'border-brand-stroke'}`}>
                     <button 
                        className="px-2 text-xs font-bold bg-gray-50 border-r border-brand-stroke text-gray-500 hover:text-brand-blue" 
                        onClick={toggleMicLang}
                        title="Switch Input Language"
                     >
                        {micLang === 'es-ES' ? 'ES' : 'EN'}
                     </button>
                     <button 
                        className={`px-3 flex items-center justify-center transition-colors ${isListening ? 'bg-red-50 text-red-500' : 'hover:bg-gray-50 text-gray-500 hover:text-brand-blue'}`} 
                        onClick={handleMicClick}
                        title={isListening ? "Stop listening" : "Start speaking"}
                     >
                        {isListening ? <StopIcon className="w-5 h-5 animate-pulse" /> : <MicrophoneIcon className="w-6 h-6" />}
                     </button>
                 </div>
            </div>
        )}
        <div className="flex-grow relative">
            <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder={isListening ? "Listening..." : "Type your message..."}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                disabled={isLoading || !chat}
                aria-label="Chat input"
                className={isListening ? "ring-2 ring-red-100 border-red-300 placeholder-red-300" : ""}
            />
        </div>
        <div className="h-[54px]">
            <Button onClick={handleSend} size="md" disabled={isLoading || !chat} className="h-full">
                {isLoading ? '...' : 'Send'}
            </Button>
        </div>
      </div>
    </div>
  );
};