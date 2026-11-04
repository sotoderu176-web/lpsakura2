# 介護タクシー LP制作テンプレート (Vercelデプロイ対応 最新完全版)

本パッケージは、介護タクシー・福祉輸送サービス向けLPの最新ソースコード一式です。
Vercelへ即座にデプロイできる構成（Vite + React + Tailwind CSS v4）になっています。

---

## ⚠️【最重要】GitHubへアップロードする際の注意点
ダウンロードしたZIPを解凍すると、フォルダ（例: kaigo-taxi-lp-vercel-...）が作成されます。
**その外側のフォルダごとGitHubにドラッグ＆ドロップしないでください！**

必ず**フォルダを開いて、中にある以下のファイル群を直接GitHubリポジトリ直下にアップロード**してください：
```text
[GitHubリポジトリ直下]
├── package.json       ← このファイルが一番上の階層に見えている必要があります
├── vercel.json
├── vite.config.ts
├── tsconfig.json
├── index.html
├── README.md
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── components/
│   ├── data/
│   └── utils/
└── public/
```

---

## 🚀 Vercelへのデプロイ手順（2分で完了）

1. GitHubで新しいリポジトリを作成し、上記のファイル群をアップロードします。
2. [Vercelダッシュボード](https://vercel.com/new) にアクセスし、「Import」をクリックします。
3. Framework Presetが「Vite」になっていることを確認し、「Deploy」をクリックします。
4. 数十秒で本番公開URL（https://xxx.vercel.app）が発行され、世界中に公開されます。

---

## 🛠️ ローカルでの起動方法
```bash
npm install
npm run dev
```
ブラウザで `http://localhost:5173` を開くとプレビューできます。
