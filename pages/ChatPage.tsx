import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GoogleGenAI, Chat } from '@google/genai';

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

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);


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

  return (
    <div className="flex flex-col h-[85vh]">
      <h1 className="text-3xl font-bold text-brand-text mb-4">Chat with Ustaza AI</h1>
      <div className="flex-grow bg-white border-2 border-brand-stroke rounded-xl p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-blue text-white' : 'bg-brand-gray text-brand-text'}`}>
              {msg.text === '' && msg.sender === 'bot' ? <TypingIndicator /> : <p className="whitespace-pre-wrap">{msg.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your question..." 
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
          disabled={isLoading || !chat}
          aria-label="Chat input"
        />
        <Button onClick={handleSend} size="md" disabled={isLoading || !chat}>
            {isLoading ? '...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};