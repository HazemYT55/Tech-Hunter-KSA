import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import { ChatMessage, DeviceRecommendation } from '../types';
import { DeviceCard } from './DeviceCard';

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onCompareToggle: (device: DeviceRecommendation) => void;
  comparingDevices: DeviceRecommendation[];
}

export const ChatInterface: React.FC<Props> = ({ messages, isLoading, onSendMessage, onCompareToggle, comparingDevices }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/20">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Tech Hunter Assistant</h2>
            <p className="text-zinc-400 max-w-md">
              Tell me what you're looking for. Example: "I need a gaming phone under 2000 SAR" or "Best laptop for university study."
            </p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-emerald-500' : 'bg-indigo-500'}`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-black" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              
              <div className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-500/10 text-emerald-50 border border-emerald-500/20 rounded-tr-sm' : 'bg-zinc-900 text-zinc-100 border border-zinc-800 rounded-tl-sm'}`}>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                </div>
                
                {msg.missionUpdate && msg.missionUpdate.completed && (
                  <div className="mt-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3 flex items-center gap-3 w-full max-w-sm">
                    <div className="bg-amber-500 text-black text-xs font-bold px-2 py-1 rounded-md">MISSION COMPLETE</div>
                    <div className="text-amber-400 text-sm font-medium">+{msg.missionUpdate.pointsEarned} XP</div>
                    <div className="text-zinc-400 text-xs truncate">{msg.missionUpdate.message}</div>
                  </div>
                )}

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
                    {msg.recommendations.map((device) => (
                      <DeviceCard 
                        key={device.id} 
                        device={device} 
                        onCompareToggle={onCompareToggle}
                        isComparing={comparingDevices.some(d => d.id === device.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
              <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
              <span className="text-zinc-400 text-sm">Analyzing Saudi market...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-zinc-950 border-t border-zinc-800">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for a device recommendation..."
            className="w-full bg-zinc-900 border border-zinc-800 text-white rounded-xl pl-4 pr-12 py-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-zinc-600"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-lg transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
