import React from 'react';
import { Smartphone, Laptop, Tablet, Gamepad2, BookOpen, Briefcase, DollarSign } from 'lucide-react';

interface Props {
  onFilterSelect: (filterText: string) => void;
}

export const Filters: React.FC<Props> = ({ onFilterSelect }) => {
  const quickFilters = [
    { icon: <Gamepad2 className="w-4 h-4" />, label: "Gaming Phone < 2000 SAR", text: "I want a gaming phone under 2000 SAR" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Student Laptop", text: "Best budget laptop for university students in Saudi Arabia" },
    { icon: <Briefcase className="w-4 h-4" />, label: "Business Tablet", text: "Recommend a tablet for work and presentations" },
    { icon: <Smartphone className="w-4 h-4" />, label: "Best Camera Phone", text: "What phone has the best camera under 4000 SAR?" },
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg">
      <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-emerald-500" />
        Quick Missions
      </h3>
      <div className="flex flex-col gap-2">
        {quickFilters.map((filter, i) => (
          <button
            key={i}
            onClick={() => onFilterSelect(filter.text)}
            className="flex items-center gap-3 text-left w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all group"
          >
            <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
              {filter.icon}
            </div>
            <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
