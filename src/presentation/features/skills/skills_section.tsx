import { useEffect, useRef, type CSSProperties } from "react";
import type { Skill } from "../../../domain/entities/portfolio";

type Props = { skills: Skill[] };

const finePointer =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SkillsSection({ skills }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!finePointer || !gridRef.current) return;
    const cards = [...gridRef.current.querySelectorAll<HTMLElement>(".skill-card")];
    const onMove = (event: PointerEvent) => {
      const card = (event.currentTarget as HTMLElement);
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--ry", `${(px * 8).toFixed(2)}deg`);
      card.style.setProperty("--rx", `${(-py * 6).toFixed(2)}deg`);
    };
    const onLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      card.style.setProperty("--ry", "0deg");
      card.style.setProperty("--rx", "0deg");
    };
    cards.forEach((card) => {
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    };
  }, []);

  return (
    <section id="skills">
      <div className="container">
        <span className="section-tag fade-up">01. Expertise</span>
        <h2 className="section-title with-lead fade-up">Technical Skills</h2>
        <p className="section-lead fade-up">The stack behind the apps — mobile UI, architecture, and the services they talk to.</p>
        <div className="skills-grid" ref={gridRef}>
          {skills.map((skill, index) => (
            <div
              key={skill.mark}
              className={`glass-card skill-card fade-up delay-${(index + 1) * 100}`}
              style={{ "--tone": skill.tone } as CSSProperties}
            >
              <span className="skill-mark" aria-hidden="true">
                {skill.mark}
              </span>
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-title font-syne">{skill.title}</h3>
              <p className="skill-desc">{skill.desc}</p>
              <div className="skill-tags">
                {skill.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
