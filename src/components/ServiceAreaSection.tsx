import React, { useState } from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { themeColors } from '../utils/themeStyles';

interface ServiceAreaSectionProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({
  template,
  colorTheme,
}) => {
  const currentTheme = themeColors[colorTheme];
  const [activeAreaTab, setActiveAreaTab] = useState<number>(0);

  // 写真版用の4枚専用実写写真（4枚すべて異なる画像！）
  const photoAreas = [
    {
      id: 0,
      title: '世田谷区全域（地域密着・最重点エリア）',
      shortTitle: '世田谷区全域',
      eta: '最短 20〜30分 急行',
      desc: '松原・経堂・下北沢・三軒茶屋・成城・二子玉川など、世田谷区内の狭い住宅街や坂道でも安心してお任せください。',
      photoUrl: '/public/assets/aistudio/photo_area1_residential_town_1793586814806_d0d72da8.jpg',
      badge: 'ZONE 1',
    },
    {
      id: 1,
      title: '隣接市区（総合病院・大学病院ネットワーク）',
      shortTitle: '隣接区・総合病院',
      eta: '30〜45分 で配車',
      desc: '渋谷区、目黒区、杉並区、大田区、中野区など周辺主要エリアの基幹医療機関への通院・退院搬送に対応します。',
      photoUrl: '/public/assets/aistudio/photo_area2_hospital_driveway_1793586833281_eddbd899.jpg',
      badge: 'ZONE 2',
    },
    {
      id: 2,
      title: '都内主要ターミナル駅・羽田/成田空港（長距離歓迎）',
      shortTitle: 'ターミナル駅・空港',
      eta: '完全予約制・定額相談',
      desc: '東京駅・品川駅・新宿駅などの新幹線ホーム乗車口や、羽田空港・成田空港の出発ロビー直付けまで安全にお連れします。',
      photoUrl: '/public/assets/aistudio/photo_haneda_roadway_parked_1793592286408_ac37e59c.jpg',
      badge: 'ZONE 3',
    },
    {
      id: 3,
      title: '県外療養施設・全国長距離転院（ストレッチャー対応）',
      shortTitle: '全国・長距離転院',
      eta: '長距離搬送プロトコル',
      desc: '神奈川・埼玉・千葉をはじめ、静岡・山梨・東北など全国への長距離転院・帰省も点滴や医療酸素を保持したまま対応可能です。',
      photoUrl: '/public/assets/aistudio/photo_area4_highway_interstate_1793586850910_afde9b79.jpg',
      badge: 'ZONE 4',
    },
  ];

  // イラスト版用の水彩画（すべて水彩画イラストで統一）
  const illustAreas = [
    {
      id: 0,
      title: '世田谷のあたたかい街並みを巡回',
      shortTitle: '世田谷エリア',
      eta: '地域密着運行',
      desc: '住宅街の細い道や商店街でも、まごころを込めてお部屋までお迎えに伺います。',
      photoUrl: '/src/assets/images/illust_slide_hospital_1793597529882.jpg',
      badge: 'ZONE 1',
    },
    {
      id: 1,
      title: '周辺の医療機関やクリニックへ',
      shortTitle: 'クリニック通院',
      eta: '定期通院対応',
      desc: 'かかりつけ医への定期受診やリハビリ通院も、車椅子のまま安心してお出かけいただけます。',
      photoUrl: '/src/assets/images/illust_slide_shopping_1793597531063.jpg',
      badge: 'ZONE 2',
    },
    {
      id: 2,
      title: '新幹線や飛行機で遠方へのご旅行・お墓参り',
      shortTitle: '新幹線・空港',
      eta: '旅の思い出支援',
      desc: '東京駅の新幹線ホームや羽田空港の搭乗口までスタッフが優しくエスコートいたします。',
      photoUrl: '/public/assets/aistudio/illustration_terminal_airport_1793583804716_1a316e46.jpg',
      badge: 'ZONE 3',
    },
    {
      id: 3,
      title: '自然豊かな療養先やふるさとへの里帰り',
      shortTitle: '長距離里帰り',
      eta: 'ゆったり安心走行',
      desc: '遠方のふるさとへの帰省や転院も、お身体に無理のないペースで丁寧にお送りいたします。',
      photoUrl: '/src/assets/images/illust_area4_hometown_1793601622997.jpg',
      badge: 'ZONE 4',
    },
  ];

  const isSimple = template === 'simple';
  const currentAreaList = template === 'illustration' || template === 'friendly' ? illustAreas : photoAreas;
  const currentArea = isSimple ? currentAreaList[0] : currentAreaList[activeAreaTab];

  return (
    <section id="area" className={`py-16 px-4 scroll-mt-20 ${
      template === 'business'
        ? 'bg-slate-50 border-t border-slate-200 text-slate-800'
        : 'bg-slate-50 text-slate-800'
    }`}>
      <div className="max-w-6xl mx-auto">
        
        {/* 見出し */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-2 ${
            template === 'business'
              ? 'bg-sky-100 text-sky-900 border border-sky-300 font-mono font-bold'
              : currentTheme.tagBg
          }`}>
            {template === 'business' ? '⑤ SERVICE AREA NETWORK' : '⑤ 運行ネットワーク'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 leading-snug break-keep sm:break-normal">
            {isSimple ? '対応エリア（世田谷区全域・地域密着）' : '対応エリア可視化マップ ＆ 運行ネットワーク'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            {isSimple
              ? '世田谷区全域を中心に地域密着で運行。お電話一本で最短20〜30分で急行いたします。'
              : '世田谷区全域の地域密着運行から、都内ターミナル駅・空港、全国長距離転院まで幅広く安心サポート。'}
          </p>
        </div>

        {/* ゾーン切り替えタブ（シンプルプランでは非表示：1個に絞る） */}
        {!isSimple && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {currentAreaList.map((a, idx) => (
              <button
                key={a.id}
                onClick={() => setActiveAreaTab(a.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeAreaTab === a.id
                    ? template === 'business'
                      ? 'bg-sky-600 text-white font-mono font-bold shadow-md'
                      : `${currentTheme.primary} text-white shadow`
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 shadow-xs'
                }`}
              >
                <span className="opacity-80 mr-1.5 font-bold">
                  {template === 'business' ? a.badge : `エリア ${idx + 1}`}
                </span>
                <span>{a.shortTitle}</span>
              </button>
            ))}
          </div>
        )}

        {/* エリア詳細表示パネル（明るい白ベース・高コントラスト） */}
        <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-lg grid lg:grid-cols-12 items-center">
          {/* 左側：画像 */}
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              src={currentArea.photoUrl}
              alt={currentArea.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-103"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-black/80 text-white text-xs sm:text-sm font-bold shadow">
                {template === 'business' ? currentArea.badge : isSimple ? '重点エリア' : `エリア ${activeAreaTab + 1}`}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/75 backdrop-blur-sm rounded-xl text-white text-xs sm:text-sm flex justify-between items-center">
              <span className="font-bold">配車目安:</span>
              <span className="font-mono text-amber-300 font-bold text-sm sm:text-base">{currentArea.eta}</span>
            </div>
          </div>

          {/* 右側：解説 */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-4">
            <span className={`text-xs sm:text-sm font-bold tracking-wider uppercase block ${
              template === 'business' ? 'text-sky-700 font-mono' : currentTheme.accent
            }`}>
              {template === 'business' ? `${currentArea.badge} // COVERAGE AREA` : '重点運行エリア'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black leading-snug text-slate-900">
              {currentArea.title}
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {currentArea.desc}
            </p>

            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs sm:text-sm">
              <span className="font-bold block text-slate-800">
                主な提携・送迎実績病院：
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs text-slate-700">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">国立成育医療研究センター</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">東邦大学医療センター大橋病院</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">公立学校共済組合 関東中央病院</span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">自衛隊中央病院</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#booking"
                className={`inline-block w-full text-center py-3.5 rounded-xl font-bold text-sm transition-all ${
                  template === 'business'
                    ? 'bg-sky-600 text-white hover:bg-sky-700 shadow-md font-mono'
                    : `${currentTheme.primary} ${currentTheme.primaryHover} text-white shadow-md`
                }`}
              >
                このエリアのお迎えを予約する ➜
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
