import { useLanguage } from "@/i18n/LanguageProvider";
import { useMemo, useState } from "react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import Tag from "@/components/shared/Tag";
import EmptyState from "@/components/shared/EmptyState";
import { journalCategories, journalPosts, type JournalCategory } from "@/data/journal";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const Journal = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<JournalCategory | "All">("All");

  const posts = useMemo(
    () => (filter === "All" ? journalPosts : journalPosts.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <Seo
        title={t(`Journal | ${site.shortName}`)}
        description={t("Learning journal: cybersecurity labs, networking notes, electrical and repair projects, and development write-ups.")}
        path="/journal"
      />
      <PageHeader
        eyebrow={t("Journal")}
        title={t("Learning journal")}
        description={t("Notes and write-ups documenting what I learn — organised by topic so progress is visible over time.")}
      />

      <section className="container mx-auto px-4 py-6">
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
              {t(cat)}
            </button>
          ))}
        </div>

        {posts.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <article key={post.slug} className="panel-glow hover:-translate-y-1">
                <div className="flex items-center justify-between gap-3">
                  <Tag variant="primary">{t(post.category)}</Tag>
                  <span className="text-xs text-muted-foreground">{t(post.date)}</span>
                </div>
                <h2 className="mt-3 text-base font-semibold">{t(post.title)}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(post.summary)}</p>
                {post.tags && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {post.tags.map((entry) => (
                      <Tag key={entry}>{t(entry)}</Tag>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            title={t("No entries published yet")}
            description={t("Technical notes and write-ups will appear here as I document my learning.")}
          />
        )}
      </section>
    </>
  );
};

export default Journal;
