import React, { useState } from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { CompanyLogo } from './CompanyLogos';
import { themeColors } from '../utils/themeStyles';

interface SiteFooterProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
  companyName: string;
  onOpenAdminLogin?: () => void;
  isAdminMode?: boolean;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({
  template,
  colorTheme,
  companyName,
  onOpenAdminLogin,
  isAdminMode,
}) => {
  const currentTheme = themeColors[colorTheme];

  const isBusiness = template === 'business';
  const isFriendly = template === 'friendly';

  return (
    <>
      <footer className={`py-12 px-6 border-t-2 transition-colors ${
        isBusiness
          ? 'bg-slate-100 border-slate-300 text-slate-950'
          : isFriendly
          ? 'bg-[#fffaf0] border-amber-300 text-[#451a03]'
          : 'bg-slate-100 border-slate-300 text-slate-900'
      }`}>
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className={`flex flex-wrap items-center justify-between gap-6 pb-6 border-b ${
            isBusiness
              ? 'border-slate-300'
              : isFriendly
              ? 'border-amber-200'
              : 'border-slate-300'
          }`}>
            <CompanyLogo template={template} companyName={companyName} />

            {/* フッターナビゲーション（ご要望②：ビジネスは濃紺・黒、ご要望③：親しみは濃茶） */}
            <div className={`flex flex-wrap items-center gap-5 text-sm sm:text-base font-bold ${
              isBusiness
                ? 'text-slate-950'
                : isFriendly
                ? 'text-[#451a03]'
                : 'text-slate-900'
            }`}>
              <a href="#simulator" className={isBusiness ? 'hover:text-sky-800 transition-colors' : isFriendly ? 'hover:text-amber-800 transition-colors' : 'hover:text-blue-600 transition-colors'}>料金シミュレーション</a>
              <a href="#booking" className={isBusiness ? 'hover:text-sky-800 transition-colors' : isFriendly ? 'hover:text-amber-800 transition-colors' : 'hover:text-blue-600 transition-colors'}>WEB予約</a>
              <a href="#area" className={isBusiness ? 'hover:text-sky-800 transition-colors' : isFriendly ? 'hover:text-amber-800 transition-colors' : 'hover:text-blue-600 transition-colors'}>対応エリア</a>
              <a href="#calendar" className={isBusiness ? 'hover:text-sky-800 transition-colors' : isFriendly ? 'hover:text-amber-800 transition-colors' : 'hover:text-blue-600 transition-colors'}>運行カレンダー</a>
              <a href="#company" className={isBusiness ? 'hover:text-sky-800 transition-colors' : isFriendly ? 'hover:text-amber-800 transition-colors' : 'hover:text-blue-600 transition-colors'}>会社概要</a>
              <a href="#faq" className={isBusiness ? 'hover:text-sky-800 transition-colors' : isFriendly ? 'hover:text-amber-800 transition-colors' : 'hover:text-blue-600 transition-colors'}>よくある質問</a>
            </div>
          </div>

          <div className={`flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-bold ${
            isBusiness
              ? 'text-slate-950'
              : isFriendly
              ? 'text-[#451a03]'
              : 'text-slate-900'
          }`}>
            <p>
              &copy; 2026 {companyName || '〇〇介護タクシー'}. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <p className={isBusiness ? 'text-sky-950 font-bold' : isFriendly ? 'text-[#451a03] font-bold' : 'text-slate-900 font-bold'}>
                国土交通省関東運輸局認可事業 / 世田谷区迎車助成券・福祉タクシー券取扱事業所
              </p>
              
              {/* ご要望①：管理者・ホストログイン（一般客には目立たない控えめなリンク） */}
              {onOpenAdminLogin && (
                <button
                  type="button"
                  onClick={onOpenAdminLogin}
                  className="text-[11px] opacity-70 hover:opacity-100 underline flex items-center gap-1 cursor-pointer"
                  title="ホスト・運行管理モード"
                >
                  <span>{isAdminMode ? '🔓 管理者ログアウト' : '🔒 ホスト管理ログイン'}</span>
                </button>
              )}
            </div>
          </div>

        </div>
      </footer>

      {/* スマホ画面下部固定アクションバー */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-2 bg-white/95 backdrop-blur-md border-t border-slate-300 md:hidden flex gap-2 shadow-2xl">
        <a
          href="tel:0120-XXX-XXX"
          className="flex-1 py-3 rounded-xl bg-slate-900 text-amber-400 font-mono font-black text-center text-xs flex items-center justify-center gap-1.5 shadow"
        >
          <span>📞</span>
          <span>0120-XXX-XXX</span>
        </a>
        <a
          href="#booking"
          className={`flex-1 py-3 rounded-xl font-bold text-center text-xs flex items-center justify-center gap-1.5 text-white shadow ${currentTheme.primary}`}
        >
          <span>✉️ WEB予約</span>
        </a>
        <a
          href="#simulator"
          className="flex-1 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-center text-xs flex items-center justify-center gap-1 shadow border border-amber-500"
        >
          <span>🔢 料金計算</span>
        </a>
      </div>
    </>
  );
};
