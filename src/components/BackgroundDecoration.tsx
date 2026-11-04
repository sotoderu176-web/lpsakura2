import React from 'react';
import { ColorTheme, DesignTemplate } from '../types';

interface BackgroundDecorationProps {
  colorTheme: ColorTheme;
  template: DesignTemplate;
}

export const BackgroundDecoration: React.FC<BackgroundDecorationProps> = ({ colorTheme, template }) => {
  if (template === 'business') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        {/* 白ベースのテクニカル・高規格グリッド */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(rgba(14, 165, 233, 0.15) 1px, transparent 1px), radial-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px',
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100/40 blur-3xl rounded-full" />
        <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-amber-100/30 blur-3xl rounded-full" />
      </div>
    );
  }

  if (template === 'friendly') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fffdfa]">
        {/* 親しみ：暖色系（イエロー・オレンジ・サンシャイン・ハニー） */}
        <div className="absolute -top-28 -right-28 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-200/45 via-orange-100/40 to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full bg-yellow-100/50 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-orange-100/35 blur-3xl" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 🍊 オレンジ：暖かな陽だまり・サンバースト */}
      {colorTheme === 'orange' && (
        <>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-amber-200/40 via-orange-100/30 to-transparent blur-3xl" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-yellow-200/30 blur-2xl" />
          <svg className="absolute top-12 right-12 w-32 h-32 opacity-25 text-amber-400 animate-spin" style={{ animationDuration: '60s' }} viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="16" fill="currentColor" />
            {[...Array(8)].map((_, i) => (
              <line key={i} x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" transform={`rotate(${i * 45} 50 50)`} />
            ))}
          </svg>
        </>
      )}

      {/* 🌸 ピンク：舞い散る桜の花びら */}
      {colorTheme === 'pink' && (
        <>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-80 h-80 rounded-full bg-pink-100/50 blur-2xl" />
          {/* 花びらSVG */}
          <svg className="absolute top-20 right-1/4 w-10 h-10 opacity-30 text-rose-400" viewBox="0 0 40 40">
            <path d="M20,0 C25,12 38,15 38,25 C38,33 30,38 20,38 C10,38 2,33 2,25 C2,15 15,12 20,0 Z" fill="currentColor" />
          </svg>
          <svg className="absolute top-96 left-16 w-8 h-8 opacity-25 text-rose-300" viewBox="0 0 40 40">
            <path d="M20,0 C25,12 38,15 38,25 C38,33 30,38 20,38 C10,38 2,33 2,25 C2,15 15,12 20,0 Z" fill="currentColor" />
          </svg>
        </>
      )}

      {/* 🌿 グリーン：新緑の木漏れ日・リーフ */}
      {colorTheme === 'green' && (
        <>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-emerald-200/35 blur-3xl" />
          <div className="absolute top-1/3 -left-32 w-80 h-80 rounded-full bg-teal-100/40 blur-2xl" />
          <svg className="absolute top-24 right-20 w-12 h-12 opacity-25 text-emerald-500" viewBox="0 0 32 32">
            <path d="M16 2C8 6 3 14 3 22c0 4 3 7 7 7 8 0 16-5 19-13C29 9 24 4 16 2zm0 0c0 10-3 18-9 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </>
      )}

      {/* 🔷 ブルー：澄み渡る青空・羽ばたく鳥 */}
      {colorTheme === 'blue' && (
        <>
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl" />
          <div className="absolute top-1/2 -left-32 w-80 h-80 rounded-full bg-blue-100/40 blur-2xl" />
          <svg className="absolute top-28 right-32 w-10 h-6 opacity-30 text-sky-600" viewBox="0 0 30 16">
            <path d="M1 12 C7 2 12 7 15 11 C18 7 23 2 29 12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <svg className="absolute top-44 right-16 w-8 h-5 opacity-20 text-sky-500" viewBox="0 0 30 16">
            <path d="M1 12 C7 2 12 7 15 11 C18 7 23 2 29 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </>
      )}
    </div>
  );
};
