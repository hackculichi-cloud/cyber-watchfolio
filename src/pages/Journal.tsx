import { useMemo, useState } from "react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
import { journalCategories, journalPosts, type JournalCategory } from "@/data/journal";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const Journal = () => {
  const [filter, setFilter] = useState<JournalCategory | "All">("All");

  const posts = useMemo(
    () => (filter === "All" ? journalPosts : journalPosts.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <Seo
        title={`Journal | ${site.shortName}`}
        description="Learning journal: cybersecurity labs, networking notes, electrical and repair projects, and development write-ups."
        path="/journal"
      />
      <PageHeader
        eyebrow="Journal"
        title="Learning journal"
        description="Notes and write-ups documenting what I learn — organised by topic so progress is visible over time."
      />

      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex flex-wrap gap-2">
          {(["All", ...journalCategories] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat as JournalCategory | "All")}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors",
                filter === cat
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {posts.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="panel-glow hover:-translate-y-1">
                <div className="flex items-center justify-between gap-3">
                  <Tag variant="primary">{post.category}</Tag>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h2 className="mt-3 text-base font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
                {post.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No entries published yet"
            description="Write-ups will appear here as they are added to the journal data file — filters and layout are already wired up."
          />
        )}
      </section>
    </>
  );
};

export default Journal;
