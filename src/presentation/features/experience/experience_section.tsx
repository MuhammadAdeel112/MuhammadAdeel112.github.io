import type { ExperienceItem } from "../../../domain/entities/portfolio";

type Props = { items: ExperienceItem[] };

export function ExperienceSection({ items }: Props) {
  return (
    <section id="experience">
      <div className="container">
        <span className="section-tag fade-up">03. Experience</span>
        <h2 className="section-title with-lead fade-up">Professional Journey</h2>
        <p className="section-lead fade-up">
          A quiet record of the work — what shipped, for whom, and how the craft was built.
        </p>
        <div className="journey">
          {items.map((item, index) => (
            <article
              key={item.index}
              className={`journey-row fade-up delay-${(index + 1) * 100}${item.isNow ? " is-now" : ""}`}
            >
              <div className="journey-when">
                <span className={`journey-date${item.tone === "sky" ? " date-sky" : item.tone === "muted" ? " date-muted" : ""}`}>
                  {item.date}
                </span>
                {item.isNow ? (
                  <span className="now-pill">
                    <i /> Now
                  </span>
                ) : null}
              </div>
              <div className="journey-axis" aria-hidden="true">
                <span className={`journey-node${item.tone === "sky" ? " node-sky" : item.tone === "muted" ? " node-muted" : ""}`} />
              </div>
              <div className="journey-body">
                <h3 className="timeline-role font-syne">{item.role}</h3>
                <div className="timeline-company">{item.company}</div>
                <p className="skill-desc">{item.desc}</p>
                <ul className="timeline-points">
                  {item.points.map((point, pointIndex) => (
                    <li key={`${item.index}-${pointIndex}`}>
                      {point.highlight ? (
                        <>
                          {point.lead}
                          <strong style={{ color: "var(--text-primary)", fontWeight: 500 }}>{point.highlight}</strong>
                          {point.rest}
                        </>
                      ) : (
                        point.rest
                      )}
                    </li>
                  ))}
                </ul>
                <div className="skill-tags">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
