import { Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import Seo from "@/components/shared/Seo";
import PageHeader from "@/components/shared/PageHeader";
import SectionHeading from "@/components/shared/SectionHeading";
import Tag from "@/components/shared/Tag";
import { site } from "@/data/site";
import { services } from "@/data/services";

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, external: false },
  { label: "GitHub", value: site.githubHandle, href: site.github, icon: Github, external: true },
  { label: "LinkedIn", value: site.linkedinHandle, href: site.linkedin, icon: Linkedin, external: true },
];

const Contact = () => {
  const activeServices = services.filter((s) => s.active);

  return (
    <>
      <Seo
        title={`Contact | ${site.shortName}`}
        description="Get in touch with Christian Velasco about IT, cybersecurity and software development opportunities or collaborations."
        path="/contact"
      />
      <PageHeader
        eyebrow="Contact"
        title="Let's talk"
        description="Open to junior roles, internships, collaborations and technical conversations. I reply in English or Spanish."
      />

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noreferrer noopener" : undefined}
              className="panel-glow flex flex-col gap-2 hover:-translate-y-1"
            >
              <c.icon className="h-5 w-5 text-primary" aria-hidden />
              <span className="text-sm font-semibold">{c.label}</span>
              <span className="break-all text-sm text-muted-foreground">{c.value}</span>
            </a>
          ))}
        </div>

        <div className="panel mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <MessageSquare className="mt-0.5 h-5 w-5 text-accent" aria-hidden />
            <div>
              <p className="text-sm font-medium">Currently available</p>
              <p className="text-sm text-muted-foreground">
                Looking for opportunities in IT, cybersecurity and software development.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {site.languages.map((l) => (
              <Tag key={l} variant="primary">{l}</Tag>
            ))}
          </div>
        </div>

        {activeServices.length > 0 && (
          <div className="mt-16">
            <SectionHeading eyebrow="Services" title="Independent services" />
            <div className="grid gap-4 md:grid-cols-2">
              {activeServices.map((s) => (
                <div key={s.id} className="panel-glow hover:-translate-y-1">
                  <h3 className="text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Contact;
