export type ProjectResult = { label: string; value: string };

export type ProjectRecord = {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  blurb: string;
  brief: string;
  role: string[];
  deliverables: string[];
  results: ProjectResult[];
  cover: string;
  width: number;
  height: number;
  gallery: string[];
  sort_order: number;
  published: boolean;
};

/** Storage paths are served through the public image proxy route. */
export function imageUrl(path: string): string {
  if (!path) return "";
  if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
  return `/api/public/image/${path}`;
}
