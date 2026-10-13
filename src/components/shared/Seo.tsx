import { useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { site } from "@/data/site";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
}

const setMeta = (selector: string, attr: string, value: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/** Lightweight per-route head management (client-side). */
const Seo = ({ title, description, path = "/" }: SeoProps) => {
  const { t, lang } = useLanguage();
  useEffect(() => {
    const localizedTitle = t(title);
    const localizedDescription = t(description);
    document.title = localizedTitle;
    setMeta('meta[property="og:locale"]', "property", "og:locale", lang === "es" ? "es_MX" : "en_US");
    setMeta('meta[name="description"]', "name", "description", localizedDescription);
    setMeta('meta[property="og:title"]', "property", "og:title", localizedTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", localizedDescription);
    setMeta('meta[property="og:url"]', "property", "og:url", `${site.url}${path}`);
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", localizedTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", localizedDescription);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${site.url}${path}`;
  }, [title, description, path, lang, t]);

  return null;
};

export default Seo;
