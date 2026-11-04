import React, { useState, useEffect } from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { themeColors } from '../utils/themeStyles';

interface HeroSectionProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
  companyName: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  template,
  colorTheme,
  companyName,
}) => {
  const currentTheme = themeColors[colorTheme];

  // イラスト版スライド用ステート
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const illustSlides = [
    {
      url: '/public/assets/aistudio/illustration_terminal_airport_1793583804716_1a316e46.jpg',
      title: '長距離・新幹線＆羽田空港サポート',
      badge: '🚅 遠方へのおでかけ',
    },
    {
      url: '/src/assets/images/illust_slide_hospital_1793597529882.jpg',
      title: '安心の病院通院・院内同行サポート',
      badge: '🏥 通院・退院・転院',
    },
    {
      url: '/src/assets/images/illust_slide_shopping_1793597531063.jpg',
      title: 'ショッピングやお散歩のお手伝い',
      badge: '🛍 お買い物・気分転換',
    },
  ];

  // 自動スライド（3.8秒）
  useEffect(() => {
    if (!isPlaying || template !== 'illustration') return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % illustSlides.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPlaying, template, illustSlides.length]);

  const nextSlide = () => setCurrentSlideIndex((prev) => (prev + 1) % illustSlides.length);
  const prevSlide = () => setCurrentSlideIndex((prev) => (prev - 1 + illustSlides.length) % illustSlides.length);

  // 🎨 イラストメイン（ご要望②：フルサイズで画面いっぱいに表示し、画像の上にテキストをオーバーレイ）
  if (template === 'illustration') {
    const currentSlide = illustSlides[currentSlideIndex];

    return (
      <section className="relative w-full min-h-[80vh] sm:min-h-[85vh] flex items-center overflow-hidden bg-rose-50/40">
        
        {/* 背景大判スライド画像（画面端までフルサイズ） */}
        <div className="absolute inset-0 z-0">
          <img
            key={currentSlide.url}
            src={currentSlide.url}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center transition-all duration-1000 ease-in-out filter brightness-[0.88]"
          />
          {/* 優しい半透明グラデーションオーバーレイ（テキスト視認性の向上） */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:w-2/3" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-black/20" />
        </div>

        {/* 画面いっぱいの画像の上に配置されたメインコピー */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-sm border ${currentTheme.border} ${currentTheme.accent} text-xs font-bold shadow-md`}>
              <span>{currentTheme.badge}</span>
              <span>やさしい水彩画で綴る、安心のおでかけサポート</span>
            </div>

            {/* ご要望の指定テキスト */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight drop-shadow-sm">
              どこへでも、
              <br />
              <span className={`${currentTheme.accent} underline decoration-wavy decoration-2`}>
                あなたらしい笑顔
              </span>
              でおでかけ。
            </h1>

            <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-white/80 shadow-sm">
              車椅子のまま無理なく乗車できる専用車で、通院やお買い物、大切なご家族との思い出づくりまで、介護資格を持つスタッフが温かく寄り添います。
            </p>

            {/* アクションボタン */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#simulator"
                className={`px-6 py-3.5 rounded-full bg-gradient-to-r ${currentTheme.gradient} text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2`}
              >
                <span>料金のめやすを計算する</span>
                <span>➜</span>
              </a>
              <a
                href="tel:0120-XXX-XXX"
                className={`px-6 py-3.5 rounded-full bg-white/95 hover:bg-white text-slate-800 border ${currentTheme.border} font-bold text-sm shadow-md transition-all`}
              >
                📞 0120-XXX-XXX
              </a>
            </div>

          </div>
        </div>

        {/* フル画面スライド操作UI（前後ボタン、ドット、一時停止） */}
        <div className={`absolute bottom-6 right-6 z-20 flex items-center gap-3 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border ${currentTheme.border} shadow-lg text-xs`}>
          <button
            onClick={prevSlide}
            className={`w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 ${currentTheme.accent} flex items-center justify-center font-bold`}
            aria-label="前のスライド"
          >
            ◀
          </button>
          
          <div className="flex items-center gap-1.5">
            {illustSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlideIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === currentSlideIndex ? `w-6 ${currentTheme.primary}` : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`スライド ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className={`w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 ${currentTheme.accent} flex items-center justify-center font-bold`}
            aria-label="次のスライド"
          >
            ▶
          </button>

          <span className="text-slate-300">|</span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-slate-600 hover:text-slate-900 font-bold text-[11px]"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>

      </section>
    );
  }

  // 🌻 親しみテンプレート（ご要望④：黒やグレーを排除し、暖色系を多めにしたオギケン風）
  if (template === 'friendly') {
    return (
      <section className="relative overflow-hidden pt-10 pb-16 px-4 bg-gradient-to-b from-amber-100/70 via-orange-50/80 to-[#fffdf7]">
        <div className="max-w-6xl mx-auto">
          {/* 親しみやすい吹き出し */}
          <div className="text-center mb-6">
            <span className="inline-block px-6 py-2.5 rounded-full bg-amber-400 text-amber-950 font-black text-sm sm:text-base shadow-sm -rotate-1 border border-amber-500/40">
              ＼ 地域のみなさまの笑顔とおでかけを一番近くで応援します！ ／
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* 左側コピー */}
            <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-900 text-xs font-bold border border-orange-300/80">
                <span>🌻</span>
                <span>世田谷・近隣地域密着</span>
                <span>・</span>
                <span>迎車助成券1,130円対応</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-amber-950 leading-tight">
                車椅子でも、
                <br />
                <span className="text-orange-600 underline decoration-amber-400 decoration-wavy decoration-2">
                  笑顔で楽しく
                </span>
                おでかけ。
              </h1>

              <p className="text-sm sm:text-base text-amber-900 leading-relaxed font-medium">
                {companyName || '〇〇介護タクシー'}は、普段お使いの車椅子のまま乗車できる専用車で、通院やお買い物、ご家族とのお食事まで、まごころを込めてお送りいたします。
              </p>

              {/* 3つの安心ポイント（暖色系カード） */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-[#fffdfa] border-2 border-amber-300 text-center shadow-sm">
                  <div className="text-2xl mb-1">😊</div>
                  <div className="text-xs font-bold text-amber-950">笑顔でお迎え</div>
                  <div className="text-[10px] text-amber-800">有資格者が介助</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fffdfa] border-2 border-amber-300 text-center shadow-sm">
                  <div className="text-2xl mb-1">🚐</div>
                  <div className="text-xs font-bold text-amber-950">やさしい運転</div>
                  <div className="text-[10px] text-amber-800">揺れの少ない安心走行</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-[#fffdfa] border-2 border-amber-300 text-center shadow-sm">
                  <div className="text-2xl mb-1">🏷️</div>
                  <div className="text-xs font-bold text-amber-950">助成券もOK</div>
                  <div className="text-[10px] text-amber-800">迎車1,130円控除</div>
                </div>
              </div>

              {/* 電話CTA */}
              <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href="tel:0120-XXX-XXX"
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-lg shadow-md border-2 border-amber-500 flex items-center gap-2 transition-transform hover:scale-102"
                >
                  <span>📞 0120-XXX-XXX</span>
                </a>
                <a
                  href="#simulator"
                  className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-md transition-transform hover:scale-102"
                >
                  料金のめやすを計算 ➜
                </a>
              </div>
            </div>

            {/* 右側：クレヨン調のあたたかい街並みイラスト */}
            <div className="lg:col-span-6">
              <div className="relative p-3 rounded-[36px] bg-amber-200/60 border-4 border-amber-300 shadow-xl rotate-1">
                <img
                  src="/src/assets/images/warm_crayon_friendly_town_1793597529740.jpg"
                  alt="クレヨン調のあたたかい街並みとおでかけイラスト"
                  className="w-full aspect-[16/10] object-cover rounded-[28px] shadow-sm"
                />
                <div className="absolute -bottom-3 -right-2 bg-[#fffdfa] px-4 py-1.5 rounded-full border-2 border-amber-400 font-bold text-xs text-amber-950 shadow-md">
                  🌻 お部屋から目的地までずっと寄り添います
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // 📸 写真メイン ＆ シンプルプラン（静止画1枚大判表示・文字崩れ防止）
  return (
    <section className="relative overflow-hidden pt-8 pb-14 px-4 bg-gradient-to-b from-blue-50/50 via-slate-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* 左側テキスト */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
              <span>🚑</span>
              <span>世田谷区・地域密着の医療連携介護タクシー</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
              “お待たせしない”
              <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
                安心の介護タクシー
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {companyName || '〇〇介護タクシー'}は、車椅子のまま乗車できる最新スロープ付き福祉車両と、介護有資格スタッフによる確かな技術で、ご自宅のお部屋から目的地まで安全・快適にお送りします。
            </p>

            {/* 3大ポイントボックス */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-2.5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">✓</span>
                <span>最短・平均20〜30分以内でお迎え急行</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">✓</span>
                <span>車椅子のまま乗車OK・リクライニング＆寝台対応</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">✓</span>
                <span>迎車助成券（1,130円）＆福祉タクシー券（100円/500円）対応</span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="tel:0120-XXX-XXX"
                className={`px-6 py-3.5 rounded-xl text-white font-black text-lg shadow-md transition-all ${currentTheme.primary} ${currentTheme.primaryHover} flex items-center gap-2`}
              >
                <span>📞 0120-XXX-XXX</span>
              </a>
              {template !== 'simple' && (
                <a
                  href="#simulator"
                  className="px-6 py-3.5 rounded-xl bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-base shadow-sm transition-all"
                >
                  料金目安を試算 ➜
                </a>
              )}
            </div>
          </div>

          {/* 右側：静止画1枚大判表示（文字崩れ防止） */}
          <div className="lg:col-span-6">
            <div className="relative p-2 rounded-2xl bg-white border-2 border-slate-200 shadow-xl">
              <img
                src="/public/assets/aistudio/photo_area2_hospital_driveway_1793586833281_eddbd899.jpg"
                alt="総合病院玄関にて車椅子乗降を丁寧に行う福祉タクシー"
                className="w-full aspect-[4/3] object-cover rounded-xl"
              />
              <div className="p-3 bg-slate-50 rounded-lg mt-2 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span className="font-bold text-slate-800">電動リフト・スロープ完備車両</span>
                <span>有資格スタッフが完全サポート</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
