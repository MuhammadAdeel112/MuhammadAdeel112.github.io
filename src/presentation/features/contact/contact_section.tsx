import { useEffect, useRef } from "react";
import type { Profile } from "../../../domain/entities/portfolio";

type Props = { profile: Profile };

const finePointer =
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function ContactSection({ profile }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [local, domain] = profile.email.split("@");

  useEffect(() => {
    const card = cardRef.current;
    if (!finePointer || !card) return;
    const onMove = (event: PointerEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x.toFixed(1)}%`);
      card.style.setProperty("--my", `${y.toFixed(1)}%`);
    };
    card.addEventListener("pointermove", onMove);
    return () => card.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-section glass-card fade-up" ref={cardRef}>
          <div className="contact-glow" aria-hidden="true" />
          <span className="now-pill">
            <i /> Open to work
          </span>
          <span className="section-tag">04. Contact</span>
          <h2 className="section-title">Let's work together.</h2>
          <p className="skill-desc">
            Open to freelance and full-time Flutter roles. Share a project brief or connect — I'll get back promptly.
          </p>
          <a href={`mailto:${profile.email}`} className="contact-email">
            {local}@<wbr />
            {domain}
          </a>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              Email me
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
