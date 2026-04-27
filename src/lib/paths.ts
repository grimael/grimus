const base = import.meta.env.BASE_URL;

export function withBase(path: string) {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) {
    return path;
  }

  return `${base}${path.replace(/^\/+/, '')}`;
}
