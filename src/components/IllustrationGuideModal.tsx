import React from 'react';

interface IllustrationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IllustrationGuideModal: React.FC<IllustrationGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl p-6 sm:p-8 text-slate-800">
        
        {/* ヘッダー */}
        <div className="flex items-center justify-between border-b pb-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 text-xl font-bold">🎨</span>
            <div>
              <h3 className="text-xl font-black text-slate-900">
                スタッフ写真の自動イラスト化について
              </h3>
              <p className="text-xs text-slate-500">
                実在のスタッフ写真を水彩画・イラストに変換する方法
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
        <div className="space-y-4 text-sm leading-relaxed">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <h4 className="font-bold text-base text-emerald-950 mb-1">
              Q. 実在のスタッフの写真を共有すれば、自動でイラスト化できますか？
            </h4>
            <p className="text-emerald-900 font-bold text-lg mt-2">
              👉 【はい、完全に可能です！】
            </p>
          </div>

          <div className="space-y-3 text-slate-700">
            <p className="font-bold text-slate-900">
              ■ 具体的な依頼手順：
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm">
              <li>
                <strong>チャット欄にお写真を添付:</strong> スタッフ様のお顔写真や介助風景の写真をそのままアップロードしてください。
              </li>
              <li>
                <strong>「この写真をイラストにして」と伝える:</strong> 「水彩画風にして」「クレヨン調にして」「親しみやすい似顔絵にして」など、お好みのテイストをご指示ください。
              </li>
              <li>
                <strong>自動変換・差し替え:</strong> 髪型・表情・ポーズ・ユニフォームの特徴を忠実に保ったまま、高品質な統一テイストのイラストを自動生成し、LPの該当箇所へ即座に差し替えます。
              </li>
            </ol>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <p className="font-bold text-slate-800 mb-1">💡 イラスト化のメリット</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>スタッフの個人プライバシーを守りながら、親近感と真心を伝えられる</li>
              <li>スタッフの入退社時にも似顔絵テイストを揃えて追加しやすい</li>
              <li>介護特有の硬さを和らげ、女性や高齢者ご家族に優しい印象を与える</li>
            </ul>
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
