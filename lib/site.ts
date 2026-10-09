export const siteUrl=new URL(process.env.NEXT_PUBLIC_SITE_URL||(process.env.VERCEL_PROJECT_PRODUCTION_URL?`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`:'http://localhost:3000')).origin;
export const title='時給診断｜あなたの本当の時給を1分で診断';
export const description='月収・労働時間・残業・通勤時間から、あなたの実質時給を無料で診断します。';
