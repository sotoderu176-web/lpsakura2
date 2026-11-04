import React, { useState } from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { defaultFaqItems, FaqItem } from '../data/lpContent';
import { themeColors } from '../utils/themeStyles';

interface FaqSectionProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ template, colorTheme }) => {
  const currentTheme = themeColors[colorTheme];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-3']);

  const toggleFaq = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = defaultFaqItems.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="faq" className={`py-16 px-4 scroll-mt-20 ${
      template === 'business' ? 'bg-[#0a0d14] text-white border-t border-slate-800' : 'bg-slate-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        
        {/* 見出し */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-2 ${
            template === 'business' ? 'bg-amber-400 text-black font-mono' : currentTheme.tagBg
          }`}>
            {template === 'business' ? '⑦ FREQUENTLY ASKED QUESTIONS' : '⑦ よくあるご質問'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            よくある質問（FAQアコーディオン）
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
            ご利用にあたって多くいただくご質問をカテゴリ別にまとめました。
          </p>
        </div>

        {/* 検索バー＆カテゴリフィルター */}
        <div className="space-y-3 mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="質問キーワードで検索（例：助成券、車椅子、ストレッチャー）"
              className="w-full px-4 py-3 pl-10 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center text-xs">
            {[
              { id: 'all', label: 'すべて' },
              { id: 'vehicle', label: '車両・車椅子' },
              { id: 'care', label: '介助・付き添い' },
              { id: 'pricing', label: '料金・助成券' },
              { id: 'reservation', label: '予約・運行' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? template === 'business'
                      ? 'bg-amber-400 text-black font-mono'
                      : `${currentTheme.primary} text-white shadow`
                    : 'bg-white text-slate-600 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* アコーディオンリスト */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  template === 'business'
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-white border-slate-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-xs flex-shrink-0 ${
                      template === 'business' ? 'bg-amber-400 text-black' : currentTheme.tagBg
                    }`}>
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </div>
                  <span className="text-lg text-slate-400 flex-shrink-0 transition-transform">
                    {isOpen ? '−' : '＋'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                    <div className="flex items-start gap-3 mt-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-black text-xs flex-shrink-0">
                        A
                      </span>
                      <p className="mt-0.5">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-400">
              該当する質問が見つかりませんでした。お気軽にお電話（0120-XXX-XXX）にてお問い合わせください。
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
