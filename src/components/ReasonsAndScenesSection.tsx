import React from 'react';
import { ColorTheme, DesignTemplate } from '../types';
import { themeColors } from '../utils/themeStyles';

interface ReasonsAndScenesSectionProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
}

export const ReasonsAndScenesSection: React.FC<ReasonsAndScenesSectionProps> = ({
  template,
  colorTheme,
}) => {
  const currentTheme = themeColors[colorTheme];

  // 写真版用の実写写真
  const photoReasons = [
    {
      num: '01',
      title: '介護福祉士などの有資格スタッフが乗務',
      desc: '特別な介護技術研修を修了したプロスタッフが、ご自宅のお部屋から目的地まで優しく安全に介助します。',
      img: '/public/assets/aistudio/photo_area2_hospital_driveway_1793586833281_eddbd899.jpg',
    },
    {
      num: '02',
      title: '車椅子のまま無理なく乗降できる専用車両',
      desc: '電動リフトおよび緩やかなスロープを完備し、普段お使いの車椅子に乗ったままお身体に負担なくご乗車いただけます。',
      img: '/public/assets/aistudio/photo_haneda_roadway_parked_1793592286408_ac37e59c.jpg',
    },
    {
      num: '03',
      title: '世田谷区全域・近隣病院へ最短20-30分急行',
      desc: '地域の道路網を知り尽くしたドライバーが待機しており、当日の急な受診や退院の要請にもスピーディーに対応いたします。',
      img: '/public/assets/aistudio/photo_area1_residential_town_1793586814806_d0d72da8.jpg',
    },
  ];

  // イラスト版用の水彩画イラスト
  const illustReasons = [
    {
      num: '01',
      title: '真心を込めたおもてなしと身体介助',
      desc: 'お身体の状態やお気持ちに寄り添い、お部屋の移動から受診の手続きまで一貫してサポートします。',
      img: '/src/assets/images/illust_slide_hospital_1793597529882.jpg',
    },
    {
      num: '02',
      title: '車椅子のまま乗れる優しい福祉専用車',
      desc: '乗り降りの負担をなくし、車窓の景色を楽しみながらリラックスして移動できる空間を整えています。',
      img: '/src/assets/images/illust_slide_shopping_1793597531063.jpg',
    },
    {
      num: '03',
      title: '遠方へのご旅行や冠婚葬祭もお手伝い',
      desc: '東京駅や羽田空港への送迎、大切なご家族の晴れ舞台への出席など、かけがえのない思い出づくりを応援します。',
      img: '/public/assets/aistudio/illustration_terminal_airport_1793583804716_1a316e46.jpg',
    },
  ];

  // 親しみ版用のイラスト
  const friendlyReasons = [
    {
      num: '01',
      title: '家族のようにあたたかい笑顔の介助',
      desc: '「今日も会えてよかった」と思っていただけるよう、思いやりのある優しい声かけを大切にしています。',
      img: '/src/assets/images/warm_crayon_friendly_town_1793597529740.jpg',
    },
    {
      num: '02',
      title: '安心・丁寧なゆったり安全運転',
      desc: '急ブレーキや急発進を徹底的になくし、段差を越える時も細心の注意を払って運転いたします。',
      img: '/src/assets/images/illust_slide_shopping_1793597531063.jpg',
    },
    {
      num: '03',
      title: '助成券や福祉券も使える明朗会計',
      desc: '世田谷区の迎車助成券（1,130円控除）や福祉タクシー券をその場ですぐ適用。事前見積もりも無料です。',
      img: '/src/assets/images/illust_slide_hospital_1793597529882.jpg',
    },
  ];

  const reasons = template === 'illustration' 
    ? illustReasons 
    : template === 'friendly' 
    ? friendlyReasons 
    : photoReasons;

  return (
    <section id="reasons" className={`py-16 px-4 ${
      template === 'friendly' ? 'bg-[#fffcf7] text-amber-950' : 'bg-white text-slate-800'
    }`}>
      <div className="max-w-6xl mx-auto">
        
        {/* セクションタイトル */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold mb-2 ${
            template === 'friendly' ? 'bg-amber-100 text-amber-900 border border-amber-300' : currentTheme.tagBg
          }`}>
            {template === 'business' ? 'REASONS TO CHOOSE' : '安心・安全の理由'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            多くの方に選ばれる、3つの安心理由
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            安全・快適・思いやりを第一に、有資格スタッフがまごころを込めて運行いたします。
          </p>
        </div>

        {/* 3枚のカード */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reasons.map((r, idx) => (
            <div
              key={r.num}
              className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg flex flex-col ${
                template === 'friendly'
                  ? 'bg-[#fffdfa] border-amber-300'
                  : template === 'illustration'
                  ? 'bg-white border-slate-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={r.img}
                  alt={r.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className={`text-xs sm:text-sm font-bold tracking-wider block mb-1.5 ${currentTheme.accent}`}>
                    {template === 'business' ? `REASON 0${idx + 1}` : `理由 ${idx + 1}`}
                  </span>
                  <h3 className="font-bold text-base sm:text-lg mb-2 leading-snug text-slate-900">
                    {r.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {r.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4ステップ ご利用の流れ */}
        <div id="flow" className="mt-20 pt-16 border-t border-slate-200/80 dark:border-slate-800">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-wider">
              {template === 'business' ? '// EASY 4-STEP FLOW' : 'ご予約から当日までの流れ'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mt-1 text-slate-900">
              ご利用の流れ（かんたん4ステップ）
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              初めての方でもお電話やWEBフォームから簡単にお申し込みいただけます。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* STEP 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 transition-all shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-md text-xs sm:text-sm font-bold ${currentTheme.tagBg}`}>
                  {template === 'business' ? 'STEP 01' : 'ステップ 1'}
                </span>
                <span className="text-2xl">📞</span>
              </div>
              <h4 className="font-bold text-base sm:text-lg mb-1.5 text-slate-900">お問い合わせ・ご相談</h4>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                お電話（0120-XXX-XXX）またはWEB・LINEより、ご希望の日時、出発地、目的地、車椅子の状態をお知らせください。
              </p>
            </div>

            {/* STEP 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 transition-all shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-md text-xs sm:text-sm font-bold ${currentTheme.tagBg}`}>
                  {template === 'business' ? 'STEP 02' : 'ステップ 2'}
                </span>
                <span className="text-2xl">📋</span>
              </div>
              <h4 className="font-bold text-base sm:text-lg mb-1.5 text-slate-900">お見積もりのご提示</h4>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                走行距離や介助内容をもとに、助成券の控除を含めた目安料金をご案内いたします。内容にご納得いただき予約確定となります。
              </p>
            </div>

            {/* STEP 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 transition-all shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-md text-xs sm:text-sm font-bold ${currentTheme.tagBg}`}>
                  {template === 'business' ? 'STEP 03' : 'ステップ 3'}
                </span>
                <span className="text-2xl">🚐</span>
              </div>
              <h4 className="font-bold text-base sm:text-lg mb-1.5 text-slate-900">当日の移動サポート</h4>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                ご指定の日時にプロのスタッフがお迎えにあがります。お部屋からの移動から目的地での受付付き添いまで丁寧に行います。
              </p>
            </div>

            {/* STEP 4 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 transition-all shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-md text-xs sm:text-sm font-bold ${currentTheme.tagBg}`}>
                  {template === 'business' ? 'STEP 04' : 'ステップ 4'}
                </span>
                <span className="text-2xl">🧾</span>
              </div>
              <h4 className="font-bold text-base sm:text-lg mb-1.5 text-slate-900">ご精算・助成券適用</h4>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                目的地到着後にご精算となります。世田谷区の迎車助成券（1,130円控除）や福祉タクシー券（100円/500円）をお使いいただけます。
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
