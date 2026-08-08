export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export default function LegalContent({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="mx-auto max-w-3xl">
      {sections.map((section) => (
        <div key={section.heading} className="mb-10 last:mb-0">
          <h2 className="mb-3 text-xl text-ink">{section.heading}</h2>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-3 text-[0.95rem] leading-relaxed text-muted">
              {p}
            </p>
          ))}
          {section.list && (
            <ul className="ml-5 list-disc text-[0.95rem] leading-relaxed text-muted">
              {section.list.map((item) => (
                <li key={item} className="mb-1.5">
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
