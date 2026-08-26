import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { ProjectRecord, ProjectResult } from "./project-types";
import { imageUrl } from "./project-types";

type Row = Database["public"]["Tables"]["projects"]["Row"];

export const ADMIN_EMAIL = "alexxalphatv@gmail.com";

export function createPublicClient() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export function mapRow(row: Row, resolveImages = true): ProjectRecord {
  const results = Array.isArray(row.results) ? (row.results as unknown as ProjectResult[]) : [];
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    client: row.client,
    year: row.year,
    category: row.category,
    blurb: row.blurb,
    brief: row.brief,
    role: row.role ?? [],
    deliverables: row.deliverables ?? [],
    results,
    cover: resolveImages ? imageUrl(row.cover) : row.cover,
    width: row.width,
    height: row.height,
    gallery: (row.gallery ?? []).map((g) => (resolveImages ? imageUrl(g) : g)),
    sort_order: row.sort_order,
    published: row.published,
  };
}
