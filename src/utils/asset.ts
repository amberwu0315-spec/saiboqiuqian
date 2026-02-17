const EXTERNAL_URL_RE = /^(https?:)?\/\//i;

export function withBase(path: string): string {
  if (EXTERNAL_URL_RE.test(path)) {
    return path;
  }

  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "/");
  const normalizedPath = path.replace(/^\/+/, "");
  return `${base}${normalizedPath}`;
}
