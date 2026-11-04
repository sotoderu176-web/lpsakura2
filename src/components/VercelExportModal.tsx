import React, { useState } from 'react';
import { exportProjectZip } from '../utils/exportZip';

interface VercelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelExportModal: React.FC<VercelExportModalProps> = ({ isOpen, onClose }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [activeTab, setActiveTab] = useState<'zip' | 'warning' | 'vercelJson' | 'readme'>('zip');

  if (!isOpen) return null;

  const handleDownload = async () => {
    setIsExporting(true);
    setStatusMsg('最新ZIPを生成中...');
    try {
      if (typeof exportProjectZip === 'function') {
        await exportProjectZip((msg) => setStatusMsg(msg));
      }
      setTimeout(() => {
        setIsExporting(false);
        setStatusMsg('ダウンロードが完了しました！');
      }, 1000);
    } catch (e) {
      console.error(e);
      setIsExporting(false);
      setStatusMsg('エラーが発生しました。もう一度お試しください。');
    }
  };

  const vercelJsonContent = `{
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* モーダルヘッダー */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-2xl">▲</span>
            <div>
              <h3 className="font-bold text-lg text-white">Vercelデプロイ用ファイル一括ダウンロード</h3>
              <p className="text-xs text-slate-400">Vercel本番公開用の完全ソースコード（Vite + React + Tailwind v4）一式</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* タブナビゲーション */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('zip')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'zip'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            📦 一括ZIPダウンロード
          </button>
          <button
            onClick={() => setActiveTab('warning')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'warning'
                ? 'border-amber-600 text-amber-700 bg-white font-black'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            ⚠️ GitHub配置の注意点（必読）
          </button>
          <button
            onClick={() => setActiveTab('vercelJson')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'vercelJson'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            vercel.json
          </button>
          <button
            onClick={() => setActiveTab('readme')}
            className={`py-3 px-4 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'readme'
                ? 'border-sky-600 text-sky-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            デプロイ手順書
          </button>
        </div>

        {/* コンテンツ領域 */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-slate-800">
          
          {activeTab === 'zip' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-3">
                <h4 className="font-bold text-base text-sky-950 flex items-center gap-2">
                  <span>🚀</span>
                  <span>最新ソースコード・設定・アセット完全同梱ZIPを生成</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Vercelへの即時デプロイに必要な最新ファイル（<code className="bg-white px-1.5 py-0.5 rounded border border-sky-300 font-mono text-xs">src/</code> 全ソースコード、Googleマップ実測料金シミュレーター、全4種のデザインテンプレート、スマホ表示完全対応CSS、<code className="bg-white px-1.5 py-0.5 rounded border border-sky-300 font-mono text-xs">vercel.json</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-sky-300 font-mono text-xs">package.json</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-sky-300 font-mono text-xs">vite.config.ts</code>）および全画像アセットを同梱しています。
                </p>
              </div>

              <div className="text-center py-4 space-y-3">
                <button
                  onClick={handleDownload}
                  disabled={isExporting}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer inline-flex items-center gap-3"
                >
                  <span className="text-xl">📥</span>
                  <span>{isExporting ? '生成中...' : 'Vercel用一括ZIPをダウンロード (.zip)'}</span>
                </button>
                {statusMsg && (
                  <p className="text-xs font-bold text-sky-700 animate-pulse">
                    {statusMsg}
                  </p>
                )}
              </div>

              {/* 注意書きアラート */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1.5">
                <strong className="block font-bold text-amber-900 text-sm">
                  ⚠️ GitHubアップロード時の注意点：
                </strong>
                <p>
                  ZIPを解凍するとフォルダが作成されますが、<strong>その外側のフォルダごとアップロードせず、フォルダの中身（package.json や src/ など）を直接リポジトリの直下に配置</strong>してください。
                </p>
              </div>
            </div>
          )}

          {activeTab === 'warning' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 space-y-3">
                <h4 className="font-black text-base text-rose-900 flex items-center gap-2">
                  <span>🚨</span>
                  <span>Vercelで「package.jsonが見つからない」エラーを防ぐ配置ルール</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                  GitHubへアップロードする際、フォルダごとドラッグ＆ドロップすると1階層深くなってしまい、Vercelが起動用ファイル（package.json）を見失ってビルドエラーになります。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                <span className="text-emerald-400 font-bold block">// 正しい配置（GitHubリポジトリ直下に見える状態）:</span>
                <pre className="text-slate-300 leading-relaxed overflow-x-auto">
{`my-github-repo/          ← リポジトリ最上層
├── package.json         ← 必ずこの階層にpackage.jsonがあること！
├── vercel.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── README.md
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   └── components/
└── public/`}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold text-slate-900 block text-sm">💡 具体的な作業手順：</span>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 leading-relaxed">
                  <li>ダウンロードしたZIPをダブルクリック等で解凍します。</li>
                  <li>解凍されたフォルダを<strong>開いて</strong>、中にあるファイル・フォルダをすべて選択（全選択: Ctrl+A / Cmd+A）します。</li>
                  <li>GitHubの「Add file」➜「Upload files」画面に、<strong>選択した中身をそのままドラッグ＆ドロップ</strong>します。</li>
                  <li>コミット後、Vercelでインポートすれば100%エラーなく自動デプロイが完了します。</li>
                </ol>
              </div>
            </div>
          )}

          {activeTab === 'vercelJson' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-800">vercel.json 設定内容（SPA用URLリライト対応）</span>
                <button
                  onClick={() => navigator.clipboard.writeText(vercelJsonContent)}
                  className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold border border-slate-300 cursor-pointer"
                >
                  コピー
                </button>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs overflow-x-auto">
                {vercelJsonContent}
              </pre>
              <p className="text-xs text-slate-500">
                ※ 強制的なビルドコマンド指定（buildCommand）は排除されており、Vercelの自動最適化および管理画面からの設定が優先されます。
              </p>
            </div>
          )}

          {activeTab === 'readme' && (
            <div className="space-y-3">
              <span className="font-bold text-sm text-slate-800">デプロイ手順書（README.md）</span>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2 leading-relaxed">
                <p><strong>1. GitHubリポジトリの作成</strong></p>
                <p>GitHubで新規リポジトリ（PublicまたはPrivate）を作成します。</p>
                <p><strong>2. ファイルのアップロード</strong></p>
                <p>ZIPの中身を直接ドラッグ＆ドロップしてコミットします。</p>
                <p><strong>3. Vercelでインポート</strong></p>
                <p>Vercelのダッシュボードで「Import」を押し、Framework Presetが「Vite」になっていることを確認して「Deploy」を押すだけで完了です。</p>
              </div>
            </div>
          )}

        </div>

        {/* モーダルフッター */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-300 cursor-pointer"
          >
            閉じる
          </button>
        </div>

      </div>
    </div>
  );
};
