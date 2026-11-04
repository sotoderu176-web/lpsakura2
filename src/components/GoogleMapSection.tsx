import React from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { themeColors } from '../utils/themeStyles';

interface GoogleMapSectionProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
  companyName: string;
}

export const GoogleMapSection: React.FC<GoogleMapSectionProps> = ({
  template,
  colorTheme,
  companyName,
}) => {
  const currentTheme = themeColors[colorTheme];

  return (
    <section id="company" className={`py-16 px-4 scroll-mt-20 ${
      template === 'friendly' ? 'bg-[#fffdf7] text-amber-950 border-t border-amber-200' : 'bg-slate-50 text-slate-800 border-t border-slate-200'
    }`}>
      <div className="max-w-6xl mx-auto">
        
        {/* 見出し ＆ 追加オプション明記バッジ */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wider shadow-sm">
              【追加オプション機能】
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTheme.tagBg}`}>
              {template === 'business' ? '④ COMPANY & ACCESS MAP' : '④ 会社概要・アクセスマップ'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            会社概要 ＆ Googleマップ案内
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            運行管理拠点および車両配備ステーションの所在地情報です。
          </p>
        </div>

        {/* 会社情報テーブル ＆ Googleマップ埋め込み */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-xl grid lg:grid-cols-12">
          
          {/* 左側：会社情報テーブル */}
          <div className="lg:col-span-6 p-6 sm:p-8 space-y-5">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span>🏢</span>
              <span>事業者ステーション概要</span>
            </h3>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-slate-500 dark:text-slate-400">事業所名</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {companyName || '〇〇介護タクシー'}（提案用テンプレート）
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-slate-500 dark:text-slate-400">代表電話番号</span>
                <a
                  href="tel:0120-XXX-XXX"
                  className={`font-mono font-bold ${
                    template === 'business' ? 'text-amber-400' : currentTheme.accent
                  }`}
                >
                  0120-XXX-XXX（受付 7:00〜19:00 / 年中無休）
                </a>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-slate-500 dark:text-slate-400">配車基地・所在地</span>
                <span className="text-slate-800 dark:text-slate-200">
                  〒156-0043 東京都世田谷区松原5丁目 1-2-3
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-slate-500 dark:text-slate-400">事業許可番号</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  国土交通省 関東運輸局認可 一般乗用旅客自動車運送事業（関自旅二第XXXX号）
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-slate-500 dark:text-slate-400">保有特装車両</span>
                <span className="text-slate-800 dark:text-slate-200">
                  スロープ式ウェルキャブ / リフト付ハイエース / ストレッチャー完備車両
                </span>
              </div>
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="font-bold text-slate-500 dark:text-slate-400">対応自治体助成券</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  世田谷区 迎車料助成券（1,130円） / 福祉タクシー利用券（100円・500円）対応
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=世田谷区松原5丁目"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline"
              >
                <span>📍 Googleマップアプリでルート案内を開く</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          {/* 右側：Googleマップ埋め込み */}
          <div className="lg:col-span-6 min-h-[340px] relative bg-slate-200">
            <iframe
              title="Google Map Location"
              src="https://maps.google.com/maps?q=Setagaya+Matsubara+5-chome+Tokyo&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[340px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
