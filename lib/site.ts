export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')).origin;
export const title = '30秒時給診断｜夜職の参考時給・月収目安をチェック';
export const description = '18歳以上の女性向け。希望エリア・業種・経験・勤務日数から、夜職の参考時給レンジと月収目安を6問で診断。結果からLINE無料相談へ。推定額は仮の参考値です。';
