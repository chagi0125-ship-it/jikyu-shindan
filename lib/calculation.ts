/** 仮のシミュレーション値。求人情報・公的統計・実際の査定には基づきません。 */
export const areas = ['東京', '神奈川・千葉・埼玉', '大阪・京都・兵庫', '愛知', '福岡', 'その他・未定'] as const;
export const industries = ['キャバクラ', 'ラウンジ', 'ガールズバー', 'セクキャバ', 'いちゃキャバ'] as const;
export const experiences = ['未経験', '1年未満', '1年以上', 'ブランクあり'] as const;
export type Answers = { age: number; area: string; industry: string; experience: string; days: number; hours: number };
export type Field = keyof Answers;
export const limits = { age: [18, 100, 1], days: [1, 7, 1], hours: [1, 8, 0.5] } as const;
export const choices = { area: areas, industry: industries, experience: experiences };
export function validateField(field: Field, value: unknown): string | null {
  if (field in choices) return (choices[field as keyof typeof choices] as readonly unknown[]).includes(value) ? null : '選択肢から選んでください。';
  if (value === '' || value === null || value === undefined) return '数値を入力してください。';
  const n = Number(value);
  if (field === 'age' && Number.isFinite(n) && n < 18) return 'この診断は18歳以上の方が対象です。18歳未満の方はご利用いただけません。';
  const [min, max, step] = limits[field as keyof typeof limits];
  if (!Number.isFinite(n) || n < min || n > max) return `${min}〜${max}の範囲で入力してください。`;
  return Math.abs(n / step - Math.round(n / step)) > 1e-6 ? `${step}刻みで入力してください。` : null;
}
const baseRanges: Record<typeof industries[number], readonly [number, number]> = {
  'キャバクラ': [2500, 4500], 'ラウンジ': [2500, 5000], 'ガールズバー': [1500, 2500],
  'セクキャバ': [2500, 4500], 'いちゃキャバ': [2000, 4000],
};
const areaFactors: Record<typeof areas[number], number> = { '東京': 1.2, '神奈川・千葉・埼玉': 1.1, '大阪・京都・兵庫': 1.1, '愛知': 1.05, '福岡': 1, 'その他・未定': 1 };
const experienceFactors: Record<typeof experiences[number], number> = { '未経験': 1, '1年未満': 1.05, '1年以上': 1.15, 'ブランクあり': 1 };
export function calculate(a: Answers) {
  for (const field of ['age', 'area', 'industry', 'experience', 'days', 'hours'] as Field[]) { const error = validateField(field, a[field]); if (error) throw new Error(error); }
  const base = baseRanges[a.industry as typeof industries[number]];
  const factor = areaFactors[a.area as typeof areas[number]] * experienceFactors[a.experience as typeof experiences[number]];
  const hourlyMin = Math.round(base[0] * factor / 100) * 100;
  const hourlyMax = Math.round(base[1] * factor / 100) * 100;
  const monthlyHours = a.days * a.hours * 4;
  return { hourlyMin, hourlyMax, monthlyHours, monthlyMin: hourlyMin * monthlyHours, monthlyMax: hourlyMax * monthlyHours };
}
export const format = (n: number) => n.toLocaleString('ja-JP', { maximumFractionDigits: 0 });
export function recommendation(a: Answers) {
  if (a.experience === '未経験') return { title: 'まずは少ない日数から、自分に合うお店探し', body: '仕事内容、接客の範囲、給与・控除、帰宅方法を事前に確認しましょう。希望する働き方と、無理なく続けられる勤務時間を相談するのがおすすめです。' };
  if (a.experience === 'ブランクあり') return { title: '今の生活に合わせたペースで再スタート', body: '以前の経験に加え、現在の希望条件も整理しましょう。勤務日数や時間を調整できるお店を相談し、仕事内容や給与条件を改めて確認するのがおすすめです。' };
  if (a.days <= 2) return { title: '週1〜2日の勤務で、生活とのバランスを', body: '本業や学業と両立しやすい日数を選んでいます。曜日やシフトの融通、終業時刻や帰宅方法まで確認しておくと、働き方を考えやすくなります。' };
  return { title: '経験を活かしつつ、続けやすい条件を比較', body: '時給だけでなく、シフトの自由度、給与から引かれる費用、休みの取りやすさも比較しましょう。生活リズムに合ったお店探しを相談するのがおすすめです。' };
}
