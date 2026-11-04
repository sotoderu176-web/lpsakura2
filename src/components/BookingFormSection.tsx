import React, { useState } from 'react';
import { BookingFormData, ColorTheme, DesignTemplate } from '../types';
import { themeColors } from '../utils/themeStyles';

interface BookingFormSectionProps {
  template: DesignTemplate;
  colorTheme: ColorTheme;
  companyName: string;
  formData: BookingFormData;
  onFormDataChange: (data: BookingFormData) => void;
}

export const BookingFormSection: React.FC<BookingFormSectionProps> = ({
  template,
  colorTheme,
  companyName,
  formData,
  onFormDataChange,
}) => {
  const currentTheme = themeColors[colorTheme];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState('');
  const [copiedLine, setCopiedLine] = useState(false);

  // LINEメッセージ文面の生成
  const generateLineText = () => {
    return `【介護タクシー予約・相談】\n事業者: ${companyName || '〇〇介護タクシー'}\nお名前: ${formData.customerName || '未記入'}\nお電話: ${formData.phone || '未記入'}\n希望日時: ${formData.date || '未定'} ${formData.time || ''}\n出発地: ${formData.departure || '未定'}\n目的地: ${formData.destination || '未定'}\n車椅子タイプ: ${formData.wheelchairType}\n介助希望: ${formData.needsAssistance ? '室内・段差介助希望' : '通常乗降のみ'}\n走行目安: ${formData.estimatedDistanceKm ? `${formData.estimatedDistanceKm}km` : '要相談'}\n試算目安額: ${formData.estimatedAmount ? `約¥${formData.estimatedAmount.toLocaleString()}` : '未試算'}\n特記事項: ${formData.notes || 'なし'}`;
  };

  const handleCopyLineText = () => {
    const text = generateLineText();
    navigator.clipboard.writeText(text);
    setCopiedLine(true);
    setTimeout(() => setCopiedLine(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReceipt = 'RES-' + Math.floor(100000 + Math.random() * 900000);
    setReceiptNumber(newReceipt);
    setIsSubmitted(true);
  };

  return (
    <section id="booking" className={`py-16 px-4 scroll-mt-20 ${
      template === 'friendly' ? 'bg-[#fffdf7] text-amber-950 border-t border-amber-200' : 'bg-white text-slate-800 border-t border-slate-200'
    }`}>
      <div className="max-w-6xl mx-auto">
        
        {/* 見出し ＆ 追加オプション明記バッジ */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black tracking-wider shadow-sm">
              【追加オプション機能】
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentTheme.tagBg}`}>
              {template === 'business' ? '②＆③ ONLINE DISPATCH' : '②＆③ WEB・LINE簡単お申込み'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            WEBメール ＆ LINEからの簡単お申込み
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            24時間いつでもWEBフォームまたは公式LINEよりご予約・事前お見積もりのご相談を承ります。
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* 左側：WEBメール申込みフォーム (②) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200 bg-slate-50/70 shadow-md">
            <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-200">
              <span className="text-xl">✉️</span>
              <div>
                <h3 className="font-bold text-lg">② WEBメール予約フォーム</h3>
                <p className="text-xs text-slate-500">必要事項をご入力のうえ送信してください</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              
              {/* シミュレーション結果の反映バナー */}
              {formData.estimatedAmount > 0 && (
                <div className={`p-3 rounded-xl border flex items-center justify-between ${
                  template === 'business'
                    ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                    : 'bg-amber-50 border-amber-300 text-amber-900'
                }`}>
                  <span className="font-bold">シミュレーション目安金額：</span>
                  <span className="font-mono font-black text-base">
                    ¥{formData.estimatedAmount.toLocaleString()} ({formData.estimatedDistanceKm}km)
                  </span>
                </div>
              )}

              {/* お名前＆お電話 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    お名前（ご利用者様またはご家族） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.customerName}
                    onChange={(e) => onFormDataChange({ ...formData, customerName: e.target.value })}
                    placeholder="例：山田 太郎"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    お電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => onFormDataChange({ ...formData, phone: e.target.value })}
                    placeholder="例：090-1234-5678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* メールアドレス */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  メールアドレス <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
                  placeholder="例：example@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              {/* 日時 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    ご利用希望日 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => onFormDataChange({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    お迎え希望時間 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => onFormDataChange({ ...formData, time: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* 出発地＆目的地 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    出発地（ご自宅・施設名等） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.departure}
                    onChange={(e) => onFormDataChange({ ...formData, departure: e.target.value })}
                    placeholder="例：世田谷区松原5丁目 自宅"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    目的地（病院・駅名等） <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.destination}
                    onChange={(e) => onFormDataChange({ ...formData, destination: e.target.value })}
                    placeholder="例：東邦大学医療センター大橋病院"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* 機材＆介助 */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    車椅子の種類
                  </label>
                  <select
                    value={formData.wheelchairType}
                    onChange={(e) => onFormDataChange({ ...formData, wheelchairType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="standard">自走・介助用標準車椅子（無料）</option>
                    <option value="reclining">リクライニング車椅子 (+2,200円)</option>
                    <option value="stretcher">寝台ストレッチャー (+4,400円)</option>
                    <option value="none">車椅子なし（歩行補助希望）</option>
                  </select>
                </div>
                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.needsAssistance}
                      onChange={(e) => onFormDataChange({ ...formData, needsAssistance: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500"
                    />
                    <span className="font-bold text-slate-700 dark:text-slate-300">
                      室内・ベッドからの段差介助を希望
                    </span>
                  </label>
                </div>
              </div>

              {/* 備考 */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  ご要望・助成券利用の有無・特記事項
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => onFormDataChange({ ...formData, notes: e.target.value })}
                  placeholder="世田谷区迎車助成券利用希望、酸素吸入器持ち込み、同乗者2名など"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold text-base shadow-md transition-all cursor-pointer ${
                  template === 'business'
                    ? 'bg-cyan-500 text-black hover:bg-cyan-400 font-mono font-black'
                    : `${currentTheme.primary} ${currentTheme.primaryHover} text-white`
                }`}
              >
                送信して予約相談を申し込む ➜
              </button>
            </form>
          </div>

          {/* 右側：LINE公式アカウント簡単申込 (③) */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-emerald-200 bg-emerald-50/50 shadow-md space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-emerald-200">
              <span className="text-xl">💬</span>
              <div>
                <h3 className="font-bold text-lg text-emerald-950">
                  ③ LINEからの簡単お申込み
                </h3>
                <p className="text-xs text-slate-500">友だち追加してメッセージを送るだけ</p>
              </div>
            </div>

            {/* LINE案内カード */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#06C755] text-white flex items-center justify-center font-black text-2xl shadow-md">
                LINE
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                公式LINEでは、担当オペレーターと1対1でチャット相談が可能です。「明日の午前中に急な退院が決まった」などの緊急連絡にも迅速に対応いたします。
              </p>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold">
                公式LINE ID: @care_taxi_support
              </div>
            </div>

            {/* 自動生成された文面プレビュー */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  LINE送信用メッセージ（自動生成）:
                </span>
                <span className="text-[10px] text-slate-400">フォーム入力内容が反映されます</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 text-slate-200 font-mono text-[11px] leading-relaxed max-h-48 overflow-y-auto whitespace-pre-wrap border border-slate-700">
                {generateLineText()}
              </div>
            </div>

            {/* コピー＆LINE起動ボタン */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleCopyLineText}
                className={`w-full py-3.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  copiedLine
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#06C755] hover:bg-[#05b34c] text-white'
                }`}
              >
                <span>{copiedLine ? '✓ コピー完了！LINEを開いて貼り付け' : '📋 文面をコピーしてLINEで送信'}</span>
              </button>

              <p className="text-[11px] text-center text-slate-500">
                ※ ボタンを押すとクリップボードにコピーされます。LINEアプリに貼り付けて送信してください。
              </p>
            </div>

          </div>

        </div>

      </div>

      {/* 予約完了モーダル */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-slate-800 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>
            <h4 className="text-xl font-black text-slate-900">
              ご予約申込みを受け付けました
            </h4>
            <div className="p-3 bg-slate-50 rounded-xl border font-mono text-xs text-slate-600">
              受付番号: <strong className="text-slate-900 font-bold text-sm">{receiptNumber}</strong>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              ご入力いただいた内容を確認し、担当スタッフよりお電話（{formData.phone || 'ご指定番号'}）またはメールにて運行可否および確定お見積もりをご連絡いたします。
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
