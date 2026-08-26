import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Save, Trash2, Upload, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  deleteProject,
  ensureAdminRole,
  listAdminProjects,
  saveProject,
} from "@/lib/projects.functions";
import { imageUrl, type ProjectRecord } from "@/lib/project-types";
import { categories } from "@/data/projects";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Dashboard — Alph@ Media CMS" },
      { name: "description", content: "Manage the Alph@ Media project archive." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Dashboard — Alph@ Media CMS" },
      { property: "og:description", content: "Manage the Alph@ Media project archive." },
    ],
  }),
  component: AdminPage,
});

type Draft = Omit<ProjectRecord, "id"> & { id?: string };

const emptyDraft: Draft = {
  slug: "",
  title: "",
  client: "",
  year: String(new Date().getFullYear()),
  category: "Branding",
  blurb: "",
  brief: "",
  role: [],
  deliverables: [],
  results: [],
  cover: "",
  width: 1000,
  height: 1000,
  gallery: [],
  sort_order: 0,
  published: true,
};

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const grantAdmin = useServerFn(ensureAdminRole);
  const fetchProjects = useServerFn(listAdminProjects);
  const save = useServerFn(saveProject);
  const remove = useServerFn(deleteProject);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    grantAdmin({ data: undefined }).catch(() => undefined);
  }, [grantAdmin]);

  const projectsQuery = useQuery({
    queryKey: ["admin-projects"],
    queryFn: () => fetchProjects({}),
  });

  const projects = useMemo(() => projectsQuery.data ?? [], [projectsQuery.data]);

  const saveMutation = useMutation({
    mutationFn: (payload: Draft) => save({ data: payload }),
    onSuccess: (res) => {
      toast.success("Project saved");
      setSelectedId(res.id);
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: () => {
      toast.success("Project deleted");
      setSelectedId(null);
      setDraft(emptyDraft);
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  function select(p: ProjectRecord) {
    setSelectedId(p.id);
    setDraft({ ...p });
  }

  async function handleUpload(files: FileList | null, target: "cover" | "gallery") {
    if (!files?.length) return;
    setUploading(true);
    try {
      const paths: string[] = [];
      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `uploads/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("project-images").upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
        if (error) throw error;
        paths.push(path);
      }
      setDraft((d) =>
        target === "cover"
          ? { ...d, cover: paths[0]! }
          : { ...d, gallery: [...d.gallery, ...paths] },
      );
      toast.success(`${paths.length} image(s) uploaded`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  const isForbidden =
    projectsQuery.isError &&
    /unauthor|permission|denied/i.test(String((projectsQuery.error as Error)?.message ?? ""));

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-16 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b-2 border-foreground pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Studio dashboard
          </p>
          <h1 className="mt-3 font-display text-5xl leading-none md:text-7xl">
            Manage <span className="italic text-primary">work</span>
          </h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedId(null);
              setDraft({ ...emptyDraft, sort_order: projects.length + 1 });
            }}
            className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-background hover:border-primary hover:bg-primary"
          >
            <Plus className="size-4" /> New project
          </button>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 border-2 border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-accent"
          >
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </div>

      {isForbidden && (
        <p className="mt-8 border-2 border-foreground bg-accent p-5 text-sm text-accent-foreground">
          This account doesn't have admin access. Sign in with the studio owner email.
        </p>
      )}

      <div className="mt-10 grid gap-10 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-2">
          {projectsQuery.isLoading && (
            <p className="text-sm text-muted-foreground">Loading projects…</p>
          )}
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => select(p)}
              className={cn(
                "flex w-full items-center justify-between gap-3 border-2 border-foreground px-4 py-3 text-left transition-colors",
                selectedId === p.id ? "bg-foreground text-background" : "hover:bg-accent",
              )}
            >
              <span>
                <span className="block font-display text-xl leading-none">{p.title}</span>
                <span className="text-xs uppercase tracking-[0.16em] opacity-70">
                  {p.category} · #{p.sort_order}
                </span>
              </span>
              {!p.published && (
                <span className="shrink-0 border border-current px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]">
                  Draft
                </span>
              )}
            </button>
          ))}
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveMutation.mutate(draft);
          }}
          className="space-y-5 border-2 border-foreground p-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Title">
              <Input value={draft.title} onChange={(v) => setDraft({ ...draft, title: v })} required />
            </Field>
            <Field label="Slug (url)">
              <Input value={draft.slug} onChange={(v) => setDraft({ ...draft, slug: v })} required />
            </Field>
            <Field label="Client">
              <Input value={draft.client} onChange={(v) => setDraft({ ...draft, client: v })} />
            </Field>
            <Field label="Year">
              <Input value={draft.year} onChange={(v) => setDraft({ ...draft, year: v })} />
            </Field>
            <Field label="Category">
              <select
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                className="w-full border-2 border-foreground bg-background px-3 py-2 outline-none focus:border-primary"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Sort order">
              <Input
                value={String(draft.sort_order)}
                onChange={(v) => setDraft({ ...draft, sort_order: Number(v) || 0 })}
              />
            </Field>
          </div>

          <Field label="Short blurb">
            <Input value={draft.blurb} onChange={(v) => setDraft({ ...draft, blurb: v })} />
          </Field>

          <Field label="The brief">
            <textarea
              value={draft.brief}
              onChange={(e) => setDraft({ ...draft, brief: e.target.value })}
              rows={4}
              className="w-full border-2 border-foreground bg-background px-3 py-2 outline-none focus:border-primary"
            />
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Roles (comma separated)">
              <Input
                value={draft.role.join(", ")}
                onChange={(v) => setDraft({ ...draft, role: splitList(v) })}
              />
            </Field>
            <Field label="Deliverables (comma separated)">
              <Input
                value={draft.deliverables.join(", ")}
                onChange={(v) => setDraft({ ...draft, deliverables: splitList(v) })}
              />
            </Field>
          </div>

          <Field label="Results (label:value, comma separated)">
            <Input
              value={draft.results.map((r) => `${r.label}:${r.value}`).join(", ")}
              onChange={(v) =>
                setDraft({
                  ...draft,
                  results: splitList(v).map((pair) => {
                    const [label, value = ""] = pair.split(":");
                    return { label: (label ?? "").trim(), value: value.trim() };
                  }),
                })
              }
            />
          </Field>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Cover image</p>
              {draft.cover && (
                <img
                  src={imageUrl(draft.cover)}
                  alt="Selected cover"
                  className="mt-3 w-full border-2 border-foreground object-cover"
                />
              )}
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 border-2 border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-accent">
                <Upload className="size-4" /> {uploading ? "Uploading…" : "Upload cover"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files, "cover")}
                />
              </label>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Gallery</p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {draft.gallery.map((g, i) => (
                  <button
                    key={`${g}-${i}`}
                    type="button"
                    title="Remove"
                    onClick={() =>
                      setDraft({ ...draft, gallery: draft.gallery.filter((_, idx) => idx !== i) })
                    }
                    className="group relative border-2 border-foreground"
                  >
                    <img src={imageUrl(g)} alt="" className="aspect-square w-full object-cover" />
                    <span className="absolute inset-0 hidden items-center justify-center bg-foreground/70 text-[10px] uppercase tracking-[0.16em] text-background group-hover:flex">
                      Remove
                    </span>
                  </button>
                ))}
              </div>
              <label className="mt-3 inline-flex cursor-pointer items-center gap-2 border-2 border-foreground px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-accent">
                <Upload className="size-4" /> Add images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files, "gallery")}
                />
              </label>
            </div>
          </div>

          <label className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em]">
            <input
              type="checkbox"
              checked={draft.published}
              onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
              className="size-4 accent-current"
            />
            Published on the site
          </label>

          <div className="flex flex-wrap gap-2 border-t-2 border-foreground pt-5">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="inline-flex items-center gap-2 border-2 border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-background hover:border-primary hover:bg-primary disabled:opacity-60"
            >
              <Save className="size-4" />
              {saveMutation.isPending ? "Saving…" : selectedId ? "Save changes" : "Create project"}
            </button>
            {selectedId && (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Delete this project?")) deleteMutation.mutate(selectedId);
                }}
                className="inline-flex items-center gap-2 border-2 border-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] hover:bg-destructive hover:text-destructive-foreground"
              >
                <Trash2 className="size-4" /> Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function splitList(value: string) {
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.2em]">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

function Input({
  value,
  onChange,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <input
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border-2 border-foreground bg-background px-3 py-2 outline-none focus:border-primary"
    />
  );
}
