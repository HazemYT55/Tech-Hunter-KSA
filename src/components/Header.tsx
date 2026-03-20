import React from 'react';
import { UserProfile } from '../types';
import { Trophy, Target, Zap } from 'lucide-react';

interface Props {
  profile: UserProfile;
}

export const Header: React.FC<Props> = ({ profile }) => {
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Tech Hunter <span className="text-emerald-400">KSA</span></h1>
            <p className="text-xs text-zinc-500 font-mono">Saudi Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-white">{profile.points} XP</span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg">
            <Zap className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-white">Lvl {profile.level}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
