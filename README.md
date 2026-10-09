# 時給診断

Next.js App Router / TypeScript / Tailwind CSS。月収・勤務時間・残業・往復通勤時間から実質時給を計算するスマホ対応サイトです。

## ローカル起動・確認

Node.js 20.9以上（推奨24 LTS）を使用してください。

```bash
npm install
npm run dev
```

http://localhost:3000 を開きます。

```bash
npm run lint
npm test
npm run build
npm start
```

## Vercelで公開

1. GitHubへコードをpushし、[Vercelの新規プロジェクト](https://vercel.com/new)で `chagi0125-ship-it/jikyu-shindan` をインポート。
2. Framework PresetはNext.js、Root Directoryはリポジトリ直下。ビルドコマンド `npm run build`、インストール `npm install`（標準設定で可）。
3. Deployを実行。DB・認証などの設定は不要です。
4. 発行された本番URLで確認。独自ドメインを使う場合は環境変数 `NEXT_PUBLIC_SITE_URL` に `https://公開ドメイン` を設定して再デプロイ。

URLが未設定ならVercelの `VERCEL_PROJECT_PRODUCTION_URL`、ローカルでは `http://localhost:3000` を使用します。環境変数には本番URLを指定します。

GitHubのpush認証が利用できない場合は実装のZIPをダウンロードし、展開したフォルダーからVercel CLIを使えます（ご自身のPCで実行）。

```bash
npm install
npx vercel login
npx vercel --prod
```

初回の質問では新規プロジェクト、コードの場所 `./`、フレームワークNext.jsを選択してください。認証トークンやパスワードをチャットへ貼る必要はありません。

## 公開後の確認

- トップ、診断の進捗、入力エラー、戻るボタン、再診断を確認。
- 年齢28、正社員、月収300000円、実働8時間、勤務20日、通勤30分、残業20時間 → 実質時給1500円、月間200時間、年間2400時間。
- スマホ・PCで横スクロールが発生しないことを確認。
- 結果シェア、キャンセル、非対応端末でのコピーを確認。
- 結果ページの再読み込みでは再診断案内を表示。
- `/robots.txt`・`/sitemap.xml` のURLが本番URLになっていること、OG画像 `/og.png` を確認。

## 仕様とプライバシー

計算は `lib/calculation.ts` に分離。

月間拘束時間 = 実働時間 × 勤務日数 + 残業時間 + 片道通勤分 × 2 ÷ 60 × 勤務日数。
実質時給 = 月収 ÷ 月間拘束時間。年間拘束時間 = 月間 × 12。

入力情報はReact Contextによるブラウザーのメモリ内だけに保持。サーバー送信、Cookie、localStorage、sessionStorage、URL保存はありません。再読み込みで消去されます。シェアは実質時給とトップURLのみ。

実働時間には休憩と残業を含めません。月収は額面で残業代を含み賞与を含みません。年齢・雇用形態は計算に影響しません。診断コメントは独自の目安で公的平均との比較ではありません。詳細は `/privacy`。

Web Share API優先、非対応時はコピー、コピーできなければ選択可能なテキストを表示。SEO metadata、canonical、静的OG画像、robots、sitemapを実装。診断・結果はnoindex。外部広告・アクセス解析・DBなし。

年齢15–100、月収1–10000000円、実働0.5–24時間、勤務1–31日、通勤0–360分、残業0–300時間。実働・残業は0.5刻み、他は整数。勤務日における合計が24時間を超える組み合わせは拒否。
