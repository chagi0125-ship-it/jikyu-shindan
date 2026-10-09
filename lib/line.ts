/** 公開されるURLです。HTTPSの公式LINEリンクのみを許可します。 */
export function getLineUrl(value: string | undefined): string | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    if (!['line.me', 'lin.ee'].includes(url.hostname) || url.pathname === '/') return null;
    return url.href;
  } catch { return null; }
}
export const lineUrl = getLineUrl(process.env.NEXT_PUBLIC_LINE_URL);
