import type { Profile } from "../../../domain/entities/portfolio";
import { useTypewriter } from "../../hooks/use_typewriter";

type Props = { profile: Profile };

export function HeroSection({ profile }: Props) {
  const role = useTypewriter(profile.roles);

  return (
    <section id="about" className="hero">
      <div className="container hero-content">
        <div className="hero-text fade-up">
          <div className="status-pill">
            <div className="status-dot" />
            {profile.status}
          </div>
          <h1 className="text-gradient">
            Muhammad
            <br />
            Adeel.
          </h1>
          <h2 className="hero-subtitle font-syne text-gradient-accent">
            <span>{role}</span>
            <span className="cursor-type">|</span>
          </h2>
          <p className="hero-desc">{profile.bio}</p>
          <div className="hero-stack">
            {profile.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View Projects
            </a>
            <a href="#contact" className="btn btn-outline">
              Get in Touch
            </a>
            <div className="hero-socials">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
                </svg>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 .3a12 12 0 00-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.77.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0012 .3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-image-container fade-up delay-200">
          <div className="hero-image-glow" aria-hidden="true" />
          <div className="portrait-stage">
            <div className="portrait-orbit portrait-orbit-slow" aria-hidden="true">
              <span className="orbit-spark spark-mango" />
            </div>
            <div className="portrait-orbit portrait-orbit-mid" aria-hidden="true">
              <span className="orbit-spark spark-lilac" />
            </div>
            <div className="portrait-orbit portrait-orbit-fast" aria-hidden="true">
              <span className="orbit-spark spark-honey" />
            </div>
            <div className="portrait-ring">
              <div className="hero-image-wrapper">
                <img src={profile.photo} alt={`${profile.name} — ${profile.title}`} className="hero-image" />
              </div>
            </div>
          </div>
          <div className="portrait-caption">
            <strong>{profile.name}</strong>
            <span>
              {profile.title} · {profile.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
