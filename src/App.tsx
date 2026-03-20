import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { Filters } from './components/Filters';
import { ComparisonTable } from './components/ComparisonTable';
import { getDeviceRecommendations } from './services/gemini';
import { ChatMessage, DeviceRecommendation, UserProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Target, AlertCircle } from 'lucide-react';

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [comparingDevices, setComparingDevices] = useState<DeviceRecommendation[]>([]);
  const [profile, setProfile] = useState<UserProfile>({
    points: 0,
    level: 1,
    completedMissions: [],
  });
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (content: string) => {
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMsg]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await getDeviceRecommendations(content);
      
      const newAssistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        recommendations: response.recommendations,
        missionUpdate: response.missionUpdate,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newAssistantMsg]);

      if (response.missionUpdate?.completed) {
        setProfile((prev) => {
          const newPoints = prev.points + (response.missionUpdate?.pointsEarned || 0);
          return {
            ...prev,
            points: newPoints,
            level: Math.floor(newPoints / 100) + 1,
          };
        });
      }
    } catch (err) {
      console.error(err);
      setError("Failed to get recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCompare = (device: DeviceRecommendation) => {
    setComparingDevices((prev) => {
      const isComparing = prev.some((d) => d.id === device.id);
      if (isComparing) {
        return prev.filter((d) => d.id !== device.id);
      }
      if (prev.length >= 3) {
        alert("You can only compare up to 3 devices at a time.");
        return prev;
      }
      return [...prev, device];
    });
  };

  const removeCompare = (id: string) => {
    setComparingDevices((prev) => prev.filter((d) => d.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-indigo-500/30">
      <Header profile={profile} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar - Filters & Missions */}
        <div className="w-full lg:w-80 flex flex-col gap-6 shrink-0">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-indigo-400" />
              Current Mission
            </h2>
            <p className="text-zinc-400 text-sm mb-4">
              Find the perfect device to earn XP and level up your Tech Hunter rank.
            </p>
            <div className="w-full bg-zinc-950 rounded-full h-2.5 mb-1 border border-zinc-800">
              <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: `${(profile.points % 100)}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-zinc-500 font-mono">
              <span>{profile.points} XP</span>
              <span>Next Lvl: {(profile.level) * 100} XP</span>
            </div>
          </div>

          <Filters onFilterSelect={handleSendMessage} />
        </div>

        {/* Main Content Area - Chat & Comparison */}
        <div className="flex-1 flex flex-col gap-6 min-w-0 h-full">
          {error && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-4 py-3 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <AnimatePresence>
            {comparingDevices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="shrink-0"
              >
                <ComparisonTable devices={comparingDevices} onRemove={removeCompare} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1 min-h-0">
            <ChatInterface 
              messages={messages}
              isLoading={isLoading}
              onSendMessage={handleSendMessage}
              onCompareToggle={toggleCompare}
              comparingDevices={comparingDevices}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
