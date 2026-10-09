'use client';
import Link from 'next/link';
export default function ErrorPage({reset}:{reset:()=>void}){return <main id="main" className="empty-state container"><h1>ページを表示できませんでした</h1><p>もう一度お試しください。</p><div className="result-actions"><button onClick={reset} className="button primary">再試行する</button><Link href="/" className="button secondary">トップページへ</Link></div></main>;}
