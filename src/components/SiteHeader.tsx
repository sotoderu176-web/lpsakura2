import React from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { CompanyLogo } from './CompanyLogos';
import { themeColors } from '../utils/themeStyles';

interface SiteHeaderProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
  companyName: string;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({
  template,
  colorTheme,
  companyName,
}) => {
  const currentTheme = themeColors[colorTheme];

  const isFriendly = template === 'friendly';
  const isBusiness = template === 'business';

  return (
    <header className={`sticky top-11 z-40 backdrop-blur-md border-b shadow-sm transition-colors ${
      isFriendly
        ? 'bg-[#fffdf8]/95 border-amber-300 text-[#451a03]'
        : 'bg-white/95 border-slate-200 text-slate-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* 左側：ロゴ */}
        <CompanyLogo template={template} companyName={companyName} />

        {/* 中央：日本語ナビゲーション（ご要望③：親しみは濃茶色、ビジネスは濃紺・黒、写真は清潔なスレート） */}
        <nav className={`hidden md:flex items-center gap-4 lg:gap-6 text-sm font-black ${
          isFriendly
            ? 'text-[#451a03]'
            : isBusiness
            ? 'text-slate-950'
            : 'text-slate-800'
        }`}>
          <a
            href="#reasons"
            className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
          >
            選ばれる理由
          </a>
          {template === 'photo' && (
            <a
              href="#scenes"
              className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
            >
              ご利用シーン
            </a>
          )}
          {template === 'business' && (
            <a
              href="#specs"
              className="hover:text-sky-700 transition-colors"
            >
              特装スペック
            </a>
          )}
          {template !== 'simple' && (
            <>
              <a
                href="#simulator"
                className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
              >
                料金試算
              </a>
              <a
                href="#calendar"
                className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
              >
                空きカレンダー
              </a>
            </>
          )}
          <a
            href="#area"
            className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
          >
            対応エリア
          </a>
          <a
            href="#flow"
            className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
          >
            ご利用の流れ
          </a>
          {template !== 'simple' && (
            <a
              href="#staff"
              className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
            >
              スタッフ紹介
            </a>
          )}
          <a
            href="#faq"
            className={isFriendly ? 'hover:text-amber-800 transition-colors' : `hover:${currentTheme.accent} transition-colors`}
          >
            よくある質問
          </a>
        </nav>

        {/* 右側：電話＆WEB予約CTA（白文字による視認性低下を徹底排除） */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="tel:0120-XXX-XXX"
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl font-black text-xs sm:text-sm transition-colors border shadow-xs ${
              isFriendly
                ? 'bg-amber-100 hover:bg-amber-200 text-[#451a03] border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-950 border-slate-300'
            }`}
          >
            <span>📞</span>
            <span className="font-mono">0120-XXX-XXX</span>
          </a>
          
          <a
            href="#booking"
            className={`hidden sm:inline-flex px-4 py-2 rounded-xl font-black text-sm shadow transition-all ${
              isFriendly
                ? 'bg-amber-500 hover:bg-amber-400 text-[#451a03] border-2 border-amber-600'
                : `text-white ${currentTheme.primary} ${currentTheme.primaryHover}`
            }`}
          >
            WEB予約・相談
          </a>
        </div>
      </div>
    </header>
  );
};
