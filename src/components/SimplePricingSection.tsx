import React from 'react';
import { ColorTheme } from '../types';
import { themeColors } from '../utils/themeStyles';

interface SimplePricingSectionProps {
  colorTheme: ColorTheme;
}

export const SimplePricingSection: React.FC<SimplePricingSectionProps> = ({ colorTheme }) => {
  const currentTheme = themeColors[colorTheme];

  return (
    <section id="simple-pricing" className="py-16 px-4 bg-slate-50 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${currentTheme.tagBg}`}>
            BASIC PRICING PLAN
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
            基本料金プラン
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            国土交通省関東運輸局認可の明朗な料金基準に基づき運行いたします。
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* PLAN 1 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400">PLAN 01</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-4">基本運賃（距離制・時間制）</h3>
              <dl className="text-xs sm:text-sm space-y-3 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">走行運賃目安</dt>
                  <dd className="font-bold text-slate-900">1kmあたり 500円</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">予約料</dt>
                  <dd className="font-bold text-slate-900">500円</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">迎車料</dt>
                  <dd className="font-bold text-slate-900">500円</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">時間制運賃</dt>
                  <dd className="font-bold text-slate-900">30分毎 3,300円〜</dd>
                </div>
              </dl>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t">
              ※ 高速道路通行料金・有料駐車場代は実費精算となります。
            </p>
          </div>

          {/* PLAN 2 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400">PLAN 02</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-4">介助料（有資格スタッフ）</h3>
              <dl className="text-xs sm:text-sm space-y-3 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">基本乗降介助料</dt>
                  <dd className="font-bold text-slate-900">1回 1,100円</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">室内・ベッド移乗</dt>
                  <dd className="font-bold text-slate-900">1回 1,100円〜</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">階段昇降・2名体制</dt>
                  <dd className="font-bold text-slate-900">別途事前お見積もり</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">院内同行・診察付添</dt>
                  <dd className="font-bold text-slate-900">30分 1,650円〜</dd>
                </div>
              </dl>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t">
              ※ 介護福祉士等の有資格スタッフが安全に乗降をお手伝いします。
            </p>
          </div>

          {/* PLAN 3 */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-400">PLAN 03</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-4">機材レンタル ＆ 助成券対応</h3>
              <dl className="text-xs sm:text-sm space-y-3 divide-y divide-slate-100">
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">標準車椅子</dt>
                  <dd className="font-bold text-emerald-600">無料貸出</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">リクライニング車椅子</dt>
                  <dd className="font-bold text-slate-900">1回 2,200円</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">寝台ストレッチャー</dt>
                  <dd className="font-bold text-slate-900">1回 4,400円</dd>
                </div>
                <div className="pt-2 flex justify-between">
                  <dt className="text-slate-600">世田谷区迎車助成券</dt>
                  <dd className="font-bold text-emerald-600">1,130円控除</dd>
                </div>
              </dl>
            </div>
            <p className="text-[11px] text-slate-500 mt-4 pt-3 border-t">
              ※ 福祉タクシー利用券（100円券・500円券）もご利用いただけます。
            </p>
          </div>

        </div>

        {/* シンプルプラン用 電話予約案内ボックス */}
        <div className="mt-8 p-6 rounded-2xl bg-white border-2 border-slate-300 text-center space-y-3 shadow-md">
          <h4 className="font-bold text-lg text-slate-900">
            ご予約・概算お見積もりはお電話にて承ります
          </h4>
          <p className="text-xs sm:text-sm text-slate-600">
            日時、出発地、目的地、車椅子の種類をお伝えいただければ、その場で概算運賃をご案内いたします。
          </p>
          <div>
            <a
              href="tel:0120-XXX-XXX"
              className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-black text-xl shadow-md transition-all ${currentTheme.primary} ${currentTheme.primaryHover}`}
            >
              <span>📞 0120-XXX-XXX</span>
            </a>
          </div>
          <p className="text-xs text-slate-500">
            受付時間：7:00〜19:00（年中無休・事前予約優先）
          </p>
        </div>

      </div>
    </section>
  );
};
