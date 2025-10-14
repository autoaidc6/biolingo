import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy Ustaza AI. Ask me anything about Spanish!', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: "That's a great question! In Spanish, you would say...", sender: 'bot' }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[85vh]">
      <h1 className="text-3xl font-bold text-brand-text mb-4">Chat with Ustaza AI</h1>
      <div className="flex-grow bg-white border-2 border-brand-stroke rounded-xl p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-blue text-white' : 'bg-brand-gray text-brand-text'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your question..." 
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend} size="md">Send</Button>
      </div>
    </div>
  );
};
