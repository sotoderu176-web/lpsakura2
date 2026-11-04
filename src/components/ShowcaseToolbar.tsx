import React from 'react';
import { ColorTheme, DesignTemplate, DevicePreview } from '../types';
import { themeColors } from '../utils/themeStyles';

interface ShowcaseToolbarProps {
  template: DesignTemplate;
  onTemplateChange: (t: DesignTemplate) => void;
  colorTheme: ColorTheme;
  onColorThemeChange: (c: ColorTheme) => void;
  devicePreview: DevicePreview;
  onDevicePreviewChange: (d: DevicePreview) => void;
  companyName: string;
  onCompanyNameChange: (name: string) => void;
  onOpenTechGuide: () => void;
  onOpenIllustrationGuide: () => void;
  onOpenVercelExport: () => void;
}

export const ShowcaseToolbar: React.FC<ShowcaseToolbarProps> = ({
  template,
  onTemplateChange,
  colorTheme,
  onColorThemeChange,
  devicePreview,
  onDevicePreviewChange,
  companyName,
  onCompanyNameChange,
  onOpenTechGuide,
  onOpenIllustrationGuide,
  onOpenVercelExport,
}) => {
  const templates: { id: DesignTemplate; label: string; desc: string; icon: string }[] = [
    { id: 'photo', label: '写真', desc: '実写・安心の信頼感', icon: '📸' },
    { id: 'illustration', label: 'イラスト', desc: 'フル画面水彩・温もり', icon: '🎨' },
    { id: 'business', label: 'ビジネス', desc: '白ベース・リアリフト高規格', icon: '⚡' },
    { id: 'friendly', label: '親しみ', desc: '暖色・クレヨン調', icon: '🌻' },
    { id: 'simple', label: 'シンプルプラン', desc: '基本LP・オプションなし', icon: '📄' },
  ];

  const colors: ColorTheme[] = ['orange', 'pink', 'green', 'blue'];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-700 shadow-md">
      <div className="max-w-7xl mx-auto px-3 py-2 overflow-x-auto scrollbar-thin">
        <div className="flex items-center justify-between gap-3 min-w-max text-xs">
          
          {/* 左側：テンプレート選択 */}
          <div className="flex items-center gap-1.5 flex-nowrap">
            <span className="font-bold text-amber-400 flex items-center gap-1 text-[11px] uppercase tracking-wider pr-1">
              <span>LPデザイン:</span>
            </span>
            <div className="flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              {templates.map((t) => {
                const isActive = template === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onTemplateChange(t.id)}
                    className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1 text-xs whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow-md scale-102'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                    }`}
                  >
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 中央：配色切り替え（オレンジ、ピンク、グリーン、ブルー） */}
          <div className="flex items-center gap-1.5 flex-nowrap">
            <span className="font-semibold text-slate-300 text-[11px]">配色:</span>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-slate-700">
              {colors.map((c) => {
                const config = themeColors[c];
                const isActive = colorTheme === c;
                return (
                  <button
                    key={c}
                    onClick={() => onColorThemeChange(c)}
                    className={`px-2.5 py-1 rounded-md font-bold text-xs transition-all flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 shadow font-black scale-105 ring-2 ring-amber-400'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{config.badge}</span>
                    <span>{config.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 右側：社名入力＆ガイドボタン */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* リアルタイム社名入力 */}
            <div className="flex items-center gap-1 bg-slate-800/90 px-2 py-1 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-[11px]">表示社名:</span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => onCompanyNameChange(e.target.value)}
                placeholder="〇〇介護タクシー"
                className="bg-slate-900 text-amber-300 text-xs font-bold px-2 py-0.5 rounded border border-slate-600 focus:outline-none focus:border-amber-400 w-32"
              />
            </div>

            {/* Vercel書き出し・一括ZIPダウンロードボタン（ご要望⑩） */}
            <button
              onClick={onOpenVercelExport}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all border border-sky-300/40 cursor-pointer whitespace-nowrap animate-pulse"
              title="Vercelへアップロード可能なHTML・画像・設定ファイル一式をダウンロード"
            >
              <span>▲📦</span>
              <span>Vercel用一括DL</span>
            </button>

            {/* ガイドモーダル起動ボタン */}
            <button
              onClick={onOpenIllustrationGuide}
              className="px-2.5 py-1 rounded-lg bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-1 border border-emerald-500/50 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              title="実写写真をイラスト化する手順"
            >
              <span>📸→🎨</span>
              <span className="hidden sm:inline">写真イラスト化</span>
            </button>

            <button
              onClick={onOpenTechGuide}
              className="px-2.5 py-1 rounded-lg bg-blue-700/80 hover:bg-blue-600 text-white font-bold text-xs flex items-center gap-1 border border-blue-500/50 transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              title="LINE簡単申込・WEBメールフォームの実装手順"
            >
              <span>📘</span>
              <span className="hidden sm:inline">連携ガイド</span>
            </button>

            {/* デバイスプレビュー切り替え */}
            <div className="hidden lg:flex items-center bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                onClick={() => onDevicePreviewChange('responsive')}
                className={`p-1.5 rounded text-xs ${
                  devicePreview === 'responsive' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="フル幅"
              >
                🖥️ フル
              </button>
              <button
                onClick={() => onDevicePreviewChange('tablet')}
                className={`p-1.5 rounded text-xs ${
                  devicePreview === 'tablet' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="タブレット (768px)"
              >
                📱 タブレット
              </button>
              <button
                onClick={() => onDevicePreviewChange('mobile')}
                className={`p-1.5 rounded text-xs ${
                  devicePreview === 'mobile' ? 'bg-slate-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="スマホ (390px)"
              >
                📲 スマホ
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
