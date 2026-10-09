import type {Metadata} from 'next';
import Link from 'next/link';
import {Clock3,ArrowUpRight} from 'lucide-react';
import {DiagnosisProvider} from '@/components/diagnosis-context';
import {siteUrl,title,description} from '@/lib/site';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL(siteUrl),title,description,openGraph:{title,description,type:'website',locale:'ja_JP',siteName:'30秒時給診断',images:['/og.png']},twitter:{card:'summary_large_image',title,description,images:['/og.png']}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ja"><body><DiagnosisProvider><a className="skip-link" href="#main">本文へスキップ</a><header><div className="container header-inner"><Link href="/" className="brand"><span className="brand-icon"><Clock3 size={21}/></span>30秒時給診断</Link><Link href="/diagnosis" className="header-link">診断する<ArrowUpRight size={16}/></Link></div></header>{children}<footer className="container"><Link href="/" className="footer-brand">30秒時給診断</Link><p>あなたらしい、次の一歩へ。</p><Link href="/privacy">プライバシー・利用上の注意</Link><small>© {new Date().getFullYear()} 時給診断</small></footer></DiagnosisProvider></body></html>;}
