import React from 'react';
import { DeviceRecommendation } from '../types';
import { X, Check } from 'lucide-react';

interface Props {
  devices: DeviceRecommendation[];
  onRemove: (id: string) => void;
}

export const ComparisonTable: React.FC<Props> = ({ devices, onRemove }) => {
  if (devices.length === 0) return null;

  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-zinc-800 bg-zinc-950 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <span className="bg-indigo-500 text-white text-xs px-2 py-1 rounded-md uppercase tracking-wider font-bold">Compare</span>
          Devices
        </h2>
        <span className="text-zinc-500 text-sm">{devices.length}/3 selected</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="p-4 text-zinc-500 font-medium w-32 shrink-0">Feature</th>
              {devices.map(device => (
                <th key={device.id} className="p-4 min-w-[200px] align-top relative">
                  <button 
                    onClick={() => onRemove(device.id)}
                    className="absolute top-4 right-4 text-zinc-500 hover:text-rose-500 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="pr-6">
                    <div className="font-bold text-white text-base mb-1">{device.name}</div>
                    <div className="text-emerald-400 font-mono">{device.priceSAR} SAR</div>
                    {device.isBestValue && (
                      <div className="mt-2 inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded-md border border-emerald-500/20">
                        <Check className="w-3 h-3" /> Best Value
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            <tr className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 text-zinc-500 font-medium">Processor</td>
              {devices.map(d => <td key={d.id} className="p-4 text-zinc-300">{d.specs.processor}</td>)}
            </tr>
            <tr className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 text-zinc-500 font-medium">RAM</td>
              {devices.map(d => <td key={d.id} className="p-4 text-zinc-300">{d.specs.ram}</td>)}
            </tr>
            <tr className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 text-zinc-500 font-medium">Storage</td>
              {devices.map(d => <td key={d.id} className="p-4 text-zinc-300">{d.specs.storage}</td>)}
            </tr>
            <tr className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 text-zinc-500 font-medium">Battery</td>
              {devices.map(d => <td key={d.id} className="p-4 text-zinc-300">{d.specs.battery}</td>)}
            </tr>
            <tr className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 text-zinc-500 font-medium">Display</td>
              {devices.map(d => <td key={d.id} className="p-4 text-zinc-300">{d.specs.display || '-'}</td>)}
            </tr>
            <tr className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 text-zinc-500 font-medium">Camera</td>
              {devices.map(d => <td key={d.id} className="p-4 text-zinc-300">{d.specs.camera || '-'}</td>)}
            </tr>
            <tr className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 text-zinc-500 font-medium">Pros</td>
              {devices.map(d => (
                <td key={d.id} className="p-4">
                  <ul className="space-y-1">
                    {(d.pros || []).map((pro, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-zinc-300 text-xs">
                        <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
