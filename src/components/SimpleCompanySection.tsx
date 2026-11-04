import React from 'react';
import { ColorTheme } from '../types';
import { themeColors } from '../utils/themeStyles';

interface SimpleCompanySectionProps {
  colorTheme: ColorTheme;
  companyName: string;
}

export const SimpleCompanySection: React.FC<SimpleCompanySectionProps> = ({
  colorTheme,
  companyName,
}) => {
  const currentTheme = themeColors[colorTheme];

  return (
    <section id="company" className="py-16 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${currentTheme.tagBg}`}>
            COMPANY PROFILE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            会社概要
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            地域のみなさまに安心・安全な外出をお届けする事業者情報です。
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="divide-y divide-slate-100 text-xs sm:text-sm">
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="font-bold text-slate-500">事業所名</span>
              <span className="font-bold text-slate-900">
                {companyName || '〇〇介護タクシー'}（提案用テンプレート）
              </span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="font-bold text-slate-500">代表電話番号</span>
              <a href="tel:0120-XXX-XXX" className={`font-mono font-bold ${currentTheme.accent}`}>
                0120-XXX-XXX（受付 7:00〜19:00 / 年中無休）
              </a>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="font-bold text-slate-500">配車基地・所在地</span>
              <span className="text-slate-800">
                〒156-0043 東京都世田谷区松原5丁目 1-2-3
              </span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="font-bold text-slate-500">事業許可番号</span>
              <span className="font-mono text-slate-700">
                国土交通省 関東運輸局認可 一般乗用旅客自動車運送事業（関自旅二第XXXX号）
              </span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="font-bold text-slate-500">保有特装車両</span>
              <span className="text-slate-800">
                スロープ式ウェルキャブ / リフト付ハイエース / ストレッチャー完備車両
              </span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="font-bold text-slate-500">対応自治体助成券</span>
              <span className="text-emerald-600 font-bold">
                世田谷区 迎車料助成券（1,130円） / 福祉タクシー利用券（100円・500円）対応
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
