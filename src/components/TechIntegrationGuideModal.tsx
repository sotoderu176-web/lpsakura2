import React from 'react';

interface TechIntegrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechIntegrationGuideModal: React.FC<TechIntegrationGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-800">
        
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-blue-100 text-blue-700 text-xl font-bold">📘</span>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                WEBメール ＆ LINE簡単申込の実装・連携手順
              </h3>
              <p className="text-xs text-slate-500">
                本LPに搭載されている予約連携機能の仕組みと本番導入ガイド
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg transition-colors"
          >
            ✕
          </button>
        </div>

        {/* 本文 */}
        <div className="space-y-6 text-sm leading-relaxed">
          
          {/* 1. LINE公式アカウント連携 */}
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-xs font-bold">METHOD 1</span>
              <h4 className="font-bold text-base text-emerald-950">LINE公式アカウントとの簡単申込連携</h4>
            </div>
            <p className="text-slate-700">
              ユーザーがシミュレーターで選んだ「日時・区間・車椅子の種類・助成券」の情報を、ワンクリックでLINEのトーク送信テキストに整形・転送する仕組みです。
            </p>
            <div className="bg-white p-3 rounded-lg border border-emerald-200 font-mono text-xs text-slate-700 space-y-1">
              <p className="font-bold text-emerald-800">【URLスキーム方式（追加コスト0円・即日稼働）】</p>
              <p className="bg-slate-50 p-2 rounded break-all">
                https://line.me/R/oaMessage/@YOUR_LINE_ID/?text=【介護タクシー予約相談】%0A日時: 11月10日 10:00...
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                ※ ボタンを押すだけでLINEアプリが立ち上がり、入力フォームの内容がトーク入力欄に自動でセットされます。
              </p>
            </div>
          </div>

          {/* 2. WEBメール申込み連携 */}
          <div className="p-5 rounded-xl bg-blue-50 border border-blue-200 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-600 text-white font-mono text-xs font-bold">METHOD 2</span>
              <h4 className="font-bold text-base text-blue-950">WEBメールフォームのバックエンド送信</h4>
            </div>
            <p className="text-slate-700">
              WEBフォームから送信されたデータを、管理者宛てに即時通知メール、お客様宛てに自動返信確認メールを送信する方法です。
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-lg border border-blue-200 text-xs">
                <p className="font-bold text-blue-800 mb-1">① Googleスプレッドシート連携（無料・簡単）</p>
                <p className="text-slate-600">
                  Google Apps Script (GAS) のWebhook URLを作成し、フォーム送信時にPOST。予約台帳スプレッドシートへ自動行追加＋Gmail通知。
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-blue-200 text-xs">
                <p className="font-bold text-blue-800 mb-1">② メールAPI（Resend / SendGrid）</p>
                <p className="text-slate-600">
                  Vercel Serverless Functions または Node.jsサーバーからAPI経由で1秒以内に高確度配信。迷惑メール判定を回避。
                </p>
              </div>
            </div>
          </div>

          {/* 3. 料金シミュレータからの自動連動 */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
            <p className="font-bold mb-1">💡 本LPのシミュレータ連動の仕組み</p>
            <p>
              「この内容でWEB予約フォームに入力」または「LINEで相談」ボタンを押すと、試算した「走行距離」「概算目安金額」「車椅子タイプ」「助成券」の各状態がそのまま予約フォームとLINEメッセージへリアルタイムに自動転記されます。
            </p>
          </div>

        </div>

        {/* フッター */}
        <div className="mt-6 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-colors"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
};
