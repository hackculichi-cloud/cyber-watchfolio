import BarberToolImage from "@/components/barbering/BarberToolImage";
import { GraduationCap, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { profileBySlug } from "@/data/profiles";
import { barberingCuts, barberingToolPhotos, barberingTraining } from "@/data/barbering";
import { site } from "@/data/site";
import ProfileHero from "@/components/profile/ProfileHero";
import ProfileSectionNav from "@/components/profile/ProfileSectionNav";
import EmptyCollectionSection from "@/components/shared/EmptyCollectionSection";
import Gallery from "@/components/shared/Gallery";
import SectionHeading from "@/components/shared/SectionHeading";
import Seo from "@/components/shared/Seo";
import Tag from "@/components/shared/Tag";
import { Button } from "@/components/ui/button";
import "@/components/barbering/Barbering.css";

const profile = profileBySlug("barbering");
const stages = [
  { title: "Consultation", description: "Agree on the cut and desired length." },
  { title: "Preparation", description: "Prepare the workstation and tools." },
  { title: "Haircut", description: "Document the technique and the process." },
  { title: "Finishing", description: "Review the shape, details and final result." },
];
const kit: { title: string; description: string; icon: "clipper" | "trimmer" | "scissors" | "hygiene" }[] = [
  { title: "Hair clipper", description: "For removing length and working with guide combs.", icon: "clipper" },
  { title: "Detail trimmer", description: "For outlining and finishing edges.", icon: "trimmer" },
  { title: "Scissors and combs", description: "For sectioning, controlling length and shaping the cut.", icon: "scissors" },
  { title: "Hygiene and care", description: "Cleaning, disinfection and protection during each session.", icon: "hygiene" },
];

export default function Barbering() {
  const { t } = useLanguage();
  return <>
    <Seo title={`${t("Barbering")} | ${site.shortName}`} description={t("Haircutting, training at Baltra Barbería in Guadalajara, and a space for my own cuts and tools.")} path="/barbering" />
    <ProfileHero profile={profile}>
      <Button asChild><a href="#cuts">{t("See my cuts")}</a></Button>
      <Button asChild variant="outline"><a href="#training">{t("My barbering training")}</a></Button>
    </ProfileHero>
    <ProfileSectionNav sections={profile.sections} />

    <section id="training" data-barbering-training className="container mx-auto scroll-mt-32 px-4 py-8 sm:py-10">
      <SectionHeading eyebrow={t("Training")} title={t("My barbering space")} description={t("Training, cuts and tools, together in one place.")} />
      <div className="barbering-training-card rounded-xl border border-primary/35 bg-surface p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="barbering-kit-icon grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/35 bg-primary/10 text-primary"><GraduationCap className="h-6 w-6" aria-hidden /></span>
            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-primary">{t("Main school")}</p>
              <h3 className="text-xl font-semibold sm:text-2xl">{barberingTraining.school}</h3>
            </div>
          </div>
          <Tag variant="primary">{t("Haircutting")}</Tag>
        </div>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground" aria-label={`${t("Training location")}: ${barberingTraining.city}`}><MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden />{barberingTraining.city}</p>
        <p className="reading-copy mt-3 max-w-3xl text-base leading-relaxed text-foreground/95">{t("Haircutting is another of my practical skills. Baltra Barbería, in Guadalajara, is my school for this area.")}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-base font-semibold">{t("A haircut, step by step")}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t("A guide to the stages I will document alongside my cuts.")}</p>
        <ol className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {stages.map((stage, index) => <li key={stage.title} className="rounded-lg border border-primary/15 bg-surface/85 p-3 sm:p-4">
            <span className="text-xs font-semibold tracking-wider text-primary">{String(index + 1).padStart(2, "0")}</span>
            <h4 className="mt-1 text-sm font-semibold">{t(stage.title)}</h4>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t(stage.description)}</p>
          </li>)}
        </ol>
      </div>
    </section>

    {barberingCuts.length ? <section id="cuts" data-barbering-cuts className="container mx-auto scroll-mt-32 px-4 py-8 sm:py-10">
      <SectionHeading eyebrow={t("Completed work")} title={t("My cuts")} description={t("Original photographs of my haircuts, with the process and final result.")} />
      <Gallery items={barberingCuts} />
    </section> : <EmptyCollectionSection id="cuts" data-barbering-cuts title="My cuts" description="My original haircut photographs will appear here when available." />}

    <section id="tools" data-barbering-tools className="container mx-auto scroll-mt-32 px-4 py-8 sm:py-10">
      <SectionHeading mascot="barbering" mascotScene="detail" eyebrow={t("Tools")} title={t("Barbering kit")} description={t("Equipment used in barbering. I will add photographs and model names from my own kit when available.")} />
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kit.map(({ title, description, icon: Icon }) => <li key={title} className="barbering-tool-card p-3">
          <BarberToolImage kind={Icon} className="mb-3 rounded-lg" />
          <h3 className="text-sm font-semibold sm:text-base">{t(title)}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(description)}</p>
        </li>)}
      </ul>
      <p className="mt-3 text-xs text-muted-foreground">{t("Generated realistic tool references. Personal equipment photographs will be added separately.")}</p>
      {barberingToolPhotos.length > 0 && <div className="mt-6"><h3 className="mb-4 text-lg font-semibold">{t("My tool photographs")}</h3><Gallery items={barberingToolPhotos} /></div>}
    </section>
  </>;
}
