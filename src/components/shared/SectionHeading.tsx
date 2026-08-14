interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  id?: string;
}

const SectionHeading = ({ eyebrow, title, description, id }: SectionHeadingProps) => (
  <div id={id} className="mb-8 scroll-mt-24">
    {eyebrow && <p className="eyebrow">{eyebrow}</p>}
    <h2 className="mt-2 text-2xl font-semibold md:text-3xl">{title}</h2>
    {description && <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>}
  </div>
);

export default SectionHeading;
