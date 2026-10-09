'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculate, choices, limits, validateField, type Answers, type Field } from '@/lib/calculation';
import { useDiagnosis } from './diagnosis-context';
const questions: { field: Field; title: string; help: string; unit?: string; placeholder?: string; presets?: number[] }[] = [
  { field: 'age', title: 'あなたの年齢を教えてください', help: '18歳以上の方が対象です。年齢によって参考時給が上下することはありません。', unit: '歳', placeholder: '22' },
  { field: 'area', title: '希望するエリアは？', help: '働きたいエリアに近いものを選んでください。まだ決まっていなくても大丈夫です。' },
  { field: 'industry', title: '希望する業種は？', help: '気になっている業種を選んでください。仕事内容や接客の範囲はお店ごとに異なります。' },
  { field: 'experience', title: '夜職の経験はありますか？', help: 'これまでの経験に近いものを選んでください。未経験の方も診断できます。' },
  { field: 'days', title: '週に何日働きたいですか？', help: '無理なく続けられそうな、希望の出勤日数を入力してください。', unit: '日 / 週', placeholder: '3', presets: [1, 2, 3, 4, 5] },
  { field: 'hours', title: '1日に何時間働きたいですか？', help: '希望の勤務時間を入力してください。休憩を含まない、給与が発生する時間の目安です。', unit: '時間 / 日', placeholder: '4', presets: [3, 4, 5, 6] },
];
export function DiagnosisForm() {
  const [step, setStep] = useState(0); const [values, setValues] = useState<Partial<Record<Field, string>>>({}); const [error, setError] = useState('');
  const { setAnswers } = useDiagnosis(); const router = useRouter(); const heading = useRef<HTMLHeadingElement>(null);
  const q = questions[step], current = values[q.field] ?? '';
  function move(n: number) { setStep(n); setError(''); requestAnimationFrame(() => heading.current?.focus()); }
  function choose(value: string) { setValues({ ...values, [q.field]: value }); move(step + 1); }
  function submit(e: React.FormEvent) {
    e.preventDefault(); const problem = validateField(q.field, current); if (problem) { setError(problem); return; }
    if (step < questions.length - 1) { move(step + 1); return; }
    const a: Answers = { age: Number(values.age), area: values.area ?? '', industry: values.industry ?? '', experience: values.experience ?? '', days: Number(values.days), hours: Number(values.hours) };
    try { calculate(a); setAnswers(a); router.push('/result'); } catch (e) { setError(e instanceof Error ? e.message : '入力内容を確認してください。'); }
  }
  const options = q.field in choices ? choices[q.field as keyof typeof choices] : null;
  const range = q.field in limits ? limits[q.field as keyof typeof limits] : null;
  return <main id="main" className="flow-main container"><Link href="/" className="back-link"><ArrowLeft size={16}/>トップへ</Link><div className="flow-heading"><p className="eyebrow">FIND YOUR NEXT STEP</p><p>あなたに合う働き方を、6つの質問から。</p></div><div className="question-card"><div className="progress-label"><span>QUESTION <strong>{String(step + 1).padStart(2, '0')}</strong> / 06</span><span>あと{6 - step}問</span></div><div role="progressbar" aria-label="診断の進捗" aria-valuemin={0} aria-valuemax={6} aria-valuenow={step + 1} className="progress-track"><span style={{ width: `${(step + 1) / 6 * 100}%` }}/></div><form onSubmit={submit} noValidate><h1 tabIndex={-1} ref={heading}>{q.title}</h1><p id="input-help" className="input-help">{q.help}</p>{options ? <div className="choice-options" role="group" aria-label={q.title} aria-describedby="input-help">{options.map(o => <button type="button" key={o} className={current === o ? 'selected' : ''} onClick={() => choose(o)}>{o}<ArrowRight size={17}/></button>)}<p className="choice-hint">選ぶと次の質問へ進みます。</p></div> : range && <><label className="sr-only" htmlFor={q.field}>{q.title}</label><div className="number-input"><input key={q.field} id={q.field} type="number" inputMode={range[2] === 1 ? 'numeric' : 'decimal'} min={range[0]} max={range[1]} step={range[2]} placeholder={q.placeholder} value={current} aria-invalid={!!error} aria-describedby="input-help input-error" onChange={e => { setValues({ ...values, [q.field]: e.target.value }); setError(''); }}/><span>{q.unit}</span></div>{q.presets && <div className="presets">{q.presets.map(n => <button type="button" key={n} onClick={() => { setValues({ ...values, [q.field]: String(n) }); setError(''); }}>{n}{q.unit?.split(' / ')[0]}</button>)}</div>}</>}<p role="alert" id="input-error" className="input-error">{error}</p><div className="form-actions"><button type="button" className="button secondary" disabled={step === 0} onClick={() => move(step - 1)}><ArrowLeft size={17}/>戻る</button>{!options && <button type="submit" className="button primary">{step === 5 ? '診断結果を見る' : '次へ進む'}<ArrowRight size={18}/></button>}</div></form></div><p className="privacy-note"><ShieldCheck size={16}/>入力情報は保存・送信されません。</p><p className="flow-note">再読み込みすると回答はリセットされます。</p></main>;
}
