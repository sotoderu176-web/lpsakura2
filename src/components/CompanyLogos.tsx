import React from 'react';
import { DesignTemplate } from '../types';

interface CompanyLogosProps {
  template: DesignTemplate;
  companyName: string;
}

export const CompanyLogo: React.FC<CompanyLogosProps> = ({ template, companyName }) => {
  if (template === 'business') {
    return (
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 bg-black border-2 border-amber-400 rounded-sm shadow-[0_0_15px_rgba(251,191,36,0.4)]">
          <span className="font-mono text-xs font-black tracking-widest text-amber-400">MMC</span>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-amber-400"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-400"></div>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 text-[10px] font-black tracking-widest bg-amber-400 text-slate-950 uppercase font-mono">
              SPEC PRO
            </span>
            <span className="text-[10px] font-mono tracking-wider text-slate-600 font-bold">
              PATIENT TRANSFER
            </span>
          </div>
          <p className="font-mono text-base font-black tracking-tight text-slate-900 uppercase">
            {companyName || 'MMC 医療搬送ネットワーク'}
          </p>
        </div>
      </div>
    );
  }

  if (template === 'illustration') {
    return (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-200 to-amber-100 border border-rose-300 flex items-center justify-center shadow-inner text-xl">
          🌸
        </div>
        <div>
          <span className="text-[11px] font-medium text-rose-600 tracking-wide block">
            やさしい水彩おでかけ支援
          </span>
          <span className="text-base font-bold text-slate-800 tracking-tight">
            {companyName || '〇〇介護タクシー'}
          </span>
        </div>
      </div>
    );
  }

  if (template === 'friendly') {
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-amber-500 flex items-center justify-center text-xl shadow-md rotate-3">
          🌻
        </div>
        <div>
          <div className="inline-block px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[10px] font-bold">
            地域のみなさまに笑顔を
          </div>
          <p className="text-base font-black text-amber-950 leading-tight">
            {companyName || '〇〇介護タクシー'}
          </p>
        </div>
      </div>
    );
  }

  if (template === 'simple') {
    return (
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm shadow">
          📄
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
            基本プラン（標準LP構成）
          </span>
          <span className="text-base font-bold text-slate-900 tracking-tight">
            {companyName || '〇〇介護タクシー'}
          </span>
        </div>
      </div>
    );
  }

  // photo (default: medical clean)
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md border border-blue-400">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z" />
        </svg>
      </div>
      <div>
        <span className="text-[10px] font-bold text-blue-700 tracking-widest uppercase block">
          MEDICAL CARE MOBILITY
        </span>
        <span className="text-base font-black text-slate-900 tracking-tight">
          {companyName || '〇〇介護タクシー'}
        </span>
      </div>
    </div>
  );
};
