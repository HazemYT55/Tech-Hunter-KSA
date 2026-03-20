import React from 'react';
import { DeviceRecommendation } from '../types';
import { Star, ShoppingCart, Cpu, Battery, HardDrive, Smartphone, Check, X } from 'lucide-react';

interface Props {
  device: DeviceRecommendation;
  onCompareToggle: (device: DeviceRecommendation) => void;
  isComparing: boolean;
}

export const DeviceCard: React.FC<Props> = ({ device, onCompareToggle, isComparing }) => {
  return (
    <div className={`relative bg-zinc-900 border ${device.isBestValue ? 'border-emerald-500' : 'border-zinc-800'} rounded-2xl p-5 shadow-lg transition-all hover:border-emerald-400/50`}>
      {device.isBestValue && (
        <div className="absolute -top-3 -right-3 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 fill-black" />
          Best Value
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{device.name}</h3>
          <p className="text-emerald-400 font-mono text-lg">{device.priceSAR} SAR</p>
        </div>
        <button 
          onClick={() => onCompareToggle(device)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${isComparing ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/50' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
        >
          {isComparing ? 'Remove Compare' : 'Compare'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <Cpu className="w-4 h-4 text-zinc-500" />
          <span className="truncate">{device.specs.processor}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <HardDrive className="w-4 h-4 text-zinc-500" />
          <span>{device.specs.ram} / {device.specs.storage}</span>
        </div>
        <div className="flex items-center gap-2 text-zinc-400 text-sm">
          <Battery className="w-4 h-4 text-zinc-500" />
          <span>{device.specs.battery}</span>
        </div>
        {device.specs.display && (
          <div className="flex items-center gap-2 text-zinc-400 text-sm">
            <Smartphone className="w-4 h-4 text-zinc-500" />
            <span className="truncate">{device.specs.display}</span>
          </div>
        )}
      </div>

      <div className="space-y-3 mb-5">
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Pros</h4>
          <ul className="space-y-1">
            {(device.pros || []).slice(0, 2).map((pro, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-zinc-300">
                <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">Cons</h4>
          <ul className="space-y-1">
            {(device.cons || []).slice(0, 2).map((con, i) => (
              <li key={i} className="flex items-start gap-1.5 text-sm text-zinc-300">
                <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(device.stores || []).map((store, i) => (
          <a 
            key={i}
            href={store.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            <ShoppingCart className="w-3 h-3" />
            {store.name}
          </a>
        ))}
      </div>
    </div>
  );
}
