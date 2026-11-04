import React, { useState } from 'react';
import { ColorTheme } from '../types';
import { themeColors } from '../utils/themeStyles';

interface BusinessStylishViewProps {
  companyName: string;
  colorTheme?: ColorTheme;
  onOpenBooking: () => void;
  onOpenSimulator: () => void;
}

export const BusinessStylishView: React.FC<BusinessStylishViewProps> = ({
  companyName,
  colorTheme = 'orange',
  onOpenBooking,
  onOpenSimulator,
}) => {
  const [activeSpecTab, setActiveSpecTab] = useState<'vehicle' | 'equipment' | 'safety'>('vehicle');
  const currentTheme = themeColors[colorTheme];

  return (
    <div className="w-full bg-white text-slate-800 font-sans selection:bg-amber-300 selection:text-black">
      
      {/* 1. フルスクリーン・エッジ・トゥ・エッジ ヒーロー（白ベース・トランク電動リフト乗降・正常向き実写写真） */}
      <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden border-b border-slate-200 bg-slate-100">
        
        {/* 背景大判写真（ご要望③：文字反転なし・車椅子のおばあちゃんが前向きに乗降する正しい実写写真） */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/business_rear_lift_correct_1793601642688.jpg"
            alt="総合病院玄関にてトランク電動リフトから安全に乗降する福祉タクシー"
            className="w-full h-full object-cover object-center filter brightness-[0.98]"
          />
          {/* 白ベースの洗練されたオーバーレイ（左側テキスト可読性とクリーン医療感） */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent sm:w-3/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent h-32 bottom-0" />
          
          {/* テクニカルHUDライン装飾 */}
          <div className="absolute top-8 left-8 hidden lg:block font-mono text-[11px] text-sky-700 font-bold tracking-widest">
            [SYS_STATUS: 24/7_STANDBY // REAR_LIFT_HYDRAULIC_READY]
          </div>
          <div className="absolute bottom-8 right-8 hidden lg:block font-mono text-[11px] font-bold tracking-widest bg-white/85 backdrop-blur-xs px-3 py-1 rounded border border-slate-300 text-slate-800">
            [FLEET: HIACE_CUSTOM // REAR_TRUNK_LIFT_200KG_OK]
          </div>
        </div>

        {/* ヒーローコンテンツ */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-24">
          <div className="max-w-2xl space-y-6">
            
            {/* タグバッジ */}
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 border-2 text-xs font-mono font-black tracking-widest uppercase shadow-sm rounded-sm ${currentTheme.border} ${currentTheme.accent}`}>
              <span className={`w-2.5 h-2.5 rounded-full ${currentTheme.primary} animate-pulse`}></span>
              <span>HIGH-SPEC MEDICAL MOBILITY NETWORK</span>
            </div>

            {/* メインキャッチコピー */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              妥協なき搬送品質。
              <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradient}`}>
                プロフェッショナル
              </span>
              <br />
              医療・介護移動支援。
            </h1>

            {/* リード文 */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-slate-200 shadow-sm">
              {companyName || 'MMC 医療搬送ネットワーク'}は、普通タクシーでは対応困難な「トランク電動大型リフト乗降」「寝たきりストレッチャー搬送」「連続給電・医療連携」「ベッド・トゥ・ベッド完全介助」を標準運用する高規格搬送ユニットです。
            </p>

            {/* 4大スペック数値インジケーター（白ベース・クリーンカード） */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-1">
              <div className="p-2.5 sm:p-3 bg-white/95 border border-slate-300 rounded-sm shadow-sm">
                <span className="text-[10px] font-mono text-sky-700 block tracking-wider font-bold">RESPONSE</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900">20-30<span className={`text-xs ml-1 ${currentTheme.accent}`}>MIN</span></span>
                <span className="text-[10px] sm:text-xs text-slate-600 block font-medium">最短急行要請</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-white/95 border border-slate-300 rounded-sm shadow-sm">
                <span className="text-[10px] font-mono text-sky-700 block tracking-wider font-bold">QUALIFIED</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900">100<span className={`text-xs ml-1 ${currentTheme.accent}`}>%</span></span>
                <span className="text-[10px] sm:text-xs text-slate-600 block font-medium">国家資格・救命認定</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-white/95 border border-slate-300 rounded-sm shadow-sm">
                <span className="text-[10px] font-mono text-sky-700 block tracking-wider font-bold">REAR LIFT</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900">200<span className={`text-xs ml-1 ${currentTheme.accent}`}>KG</span></span>
                <span className="text-[10px] sm:text-xs text-slate-600 block font-medium">トランク大型リフト</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-white/95 border border-slate-300 rounded-sm shadow-sm">
                <span className="text-[10px] font-mono text-sky-700 block tracking-wider font-bold">SUBSIDY</span>
                <span className="text-xl sm:text-2xl font-mono font-black text-slate-900">1,130<span className={`text-xs ml-1 ${currentTheme.accent}`}>円</span></span>
                <span className="text-[10px] sm:text-xs text-slate-600 block font-medium">迎車券即時控除</span>
              </div>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                onClick={onOpenSimulator}
                className={`flex-1 sm:flex-initial px-5 sm:px-6 py-3.5 ${currentTheme.primary} ${currentTheme.primaryHover} text-white font-mono font-black text-xs sm:text-sm tracking-wider uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer rounded-sm`}
              >
                <span>[ 料金シミュレーション ]</span>
                <span>➜</span>
              </button>
              <button
                onClick={onOpenBooking}
                className="flex-1 sm:flex-initial px-5 sm:px-6 py-3.5 bg-white hover:bg-slate-50 text-sky-700 border-2 border-sky-600 font-mono font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-sm cursor-pointer rounded-sm flex items-center justify-center"
              >
                // WEB・LINE予約
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 2. プロフェッショナル特装車両 ＆ 車内医療機材スペックギャラリー（白ベース） */}
      <section id="specs" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 bg-white">
        <div className={`border-l-4 pl-4 mb-10 ${currentTheme.border.replace('border-', 'border-l-')}`}>
          <span className={`text-xs font-mono font-bold tracking-widest uppercase ${currentTheme.accent}`}>
            // RIG_SPECIFICATIONS_&_EQUIPMENT
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            急な対応やお身体の状態に柔軟に応える、安心の専用特装スペック
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
            ストレッチャー、車イス搬送に対応
          </p>
        </div>

        {/* ギャラリー＆スペックタブ */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* 左側：車内ストレッチャー機材写真 */}
          <div className="lg:col-span-7 relative group">
            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-md">
              <img
                src="/src/assets/images/business_interior_stretcher_1793597528815.jpg"
                alt="医療ストレッチャー・酸素ボンベ・100V電源ユニット車内機材"
                className="w-full aspect-[16/10] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-white/95 border border-amber-500 px-3 py-1 font-mono text-[10px] text-amber-900 font-bold tracking-wider rounded shadow-sm">
                CABIN_EQUIPMENT: STRETCHER_GUIDE_RAIL_ACTIVE
              </div>
            </div>
          </div>

          {/* 右側：スペックカード */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* タブ切り替え */}
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveSpecTab('vehicle')}
                className={`flex-1 py-2 font-mono text-xs font-bold transition-all border-b-2 ${
                  activeSpecTab === 'vehicle'
                    ? 'border-amber-500 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                [01: 車両諸元]
              </button>
              <button
                onClick={() => setActiveSpecTab('equipment')}
                className={`flex-1 py-2 font-mono text-xs font-bold transition-all border-b-2 ${
                  activeSpecTab === 'equipment'
                    ? 'border-sky-600 text-sky-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                [02: 医療機器]
              </button>
              <button
                onClick={() => setActiveSpecTab('safety')}
                className={`flex-1 py-2 font-mono text-xs font-bold transition-all border-b-2 ${
                  activeSpecTab === 'safety'
                    ? 'border-amber-500 text-amber-700'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                [03: 安全認証]
              </button>
            </div>

            {/* タブ内容（白ベース） */}
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-xs space-y-3 shadow-inner">
              {activeSpecTab === 'vehicle' && (
                <>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">ベース車両:</span>
                    <span className="text-slate-900 font-bold">トヨタ ハイエース スーパーロング 特装</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">乗降システム:</span>
                    <span className="text-amber-700 font-bold">後部トランク耐荷重200kg 油圧リフト</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">室内高:</span>
                    <span className="text-slate-900 font-bold">1,600mm（立ったまま介助可能）</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">乗車定員:</span>
                    <span className="text-sky-700 font-bold">ストレッチャー1台 ＋ 付添3名</span>
                  </div>
                </>
              )}

              {activeSpecTab === 'equipment' && (
                <>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">AC電源ユニット:</span>
                    <span className="text-amber-700 font-bold">DC-AC 100V 正弦波インバーター (1500W)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">吸引器・酸素:</span>
                    <span className="text-slate-900 font-bold">車載医療配管・酸素ボンベ固定ホルダー完備</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">防振ストレッチャー:</span>
                    <span className="text-sky-700 font-bold">JIS規格4点固定ガイドレール</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">消毒システム:</span>
                    <span className="text-slate-900 font-bold">オゾン空間除菌・運行毎アルコール清掃</span>
                  </div>
                </>
              )}

              {activeSpecTab === 'safety' && (
                <>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">事業認可:</span>
                    <span className="text-slate-900 font-bold">国土交通省関東運輸局 認可運送事業</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">患者等搬送適任:</span>
                    <span className="text-amber-700 font-bold">消防局認定 患者等搬送事業者 準拠</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-600">賠償責任保険:</span>
                    <span className="text-sky-700 font-bold">対人無制限 / 身体介助保険完備</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">運行管理体制:</span>
                    <span className="text-slate-900 font-bold">アルコールチェッカー・デジタルタコグラフ</span>
                  </div>
                </>
              )}
            </div>

            {/* 夜間・首都高高速走行写真バナー */}
            <div className="relative overflow-hidden rounded-xl border border-slate-200">
              <img
                src="/src/assets/images/business_night_transfer_1793597549639.jpg"
                alt="夜間・長距離県外搬送プロトコル"
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-between px-4">
                <span className="font-mono text-xs text-white font-bold">
                  // 24H_LONG_DISTANCE: 全国県外転院対応
                </span>
                <span className="text-amber-400 font-mono text-xs font-bold">高速直通 ➜</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. 4大運行プロトコル（白ベース・洗練されたB2Bクリーンカード） */}
      <section className="bg-slate-50 border-y border-slate-200 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3 py-1 bg-sky-100 text-sky-800 border border-sky-300 font-mono text-xs font-bold uppercase tracking-wider rounded">
              MMC TRANSPORT PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              安心・安全をお届けする、4つの運行基準
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-500 transition-colors shadow-sm">
              <span className="text-2xl font-mono font-black text-amber-600 block mb-2">RULE 01</span>
              <h3 className="font-bold text-base text-slate-900 mb-2">ベッド・トゥ・ベッド完全介助</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                玄関前での引き渡しではなく、お部屋のベッドサイドから病院の受診フロア・病室まで一貫して介助します。
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-sky-500 transition-colors shadow-sm">
              <span className="text-2xl font-mono font-black text-sky-600 block mb-2">RULE 02</span>
              <h3 className="font-bold text-base text-slate-900 mb-2">低Gフォース定速走行</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                急加速・急減速を排し、お身体への負担や車酔いを極限まで抑えるプロトコル走行を徹底します。
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-amber-500 transition-colors shadow-sm">
              <span className="text-2xl font-mono font-black text-amber-600 block mb-2">RULE 03</span>
              <h3 className="font-bold text-base text-slate-900 mb-2">完全明朗会計・助成券即時対応</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                迎車助成券1,130円控除や福祉券の適用を即座に反映。不透明な追加料金のない事前見積もりを厳守。
              </p>
            </div>

            <div className="p-5 bg-white border border-slate-200 rounded-xl hover:border-sky-500 transition-colors shadow-sm">
              <span className="text-2xl font-mono font-black text-sky-600 block mb-2">RULE 04</span>
              <h3 className="font-bold text-base text-slate-900 mb-2">有資格者100%乗務</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                介護福祉士・患者等搬送適任証・二種免許を保有するプロフェッショナルのみがステアリングを握ります。
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
