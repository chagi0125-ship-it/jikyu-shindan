import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { lineUrl } from '@/lib/line';
export function LineConsultation() {
  return <section className="line-card"><span className="line-kicker">ひとりで悩まず、まずは相談</span><h2>あなたに合った働き方を<br/>一緒に考えませんか？</h2><p>希望エリアや勤務条件など、お店探しの疑問を無料で相談できます。</p>{lineUrl ? <a href={lineUrl} className="button line-button" target="_blank" rel="noopener noreferrer"><MessageCircle size={21}/>LINEで無料相談する<ArrowUpRight size={18}/></a> : <button type="button" disabled className="button line-button"><MessageCircle size={21}/>LINEで無料相談する</button>}<small>{lineUrl ? 'LINEが開きます。診断への回答は自動送信されません。' : '公式LINEの準備中です。現在は相談ボタンをご利用いただけません。'}</small></section>;
}
