import { useEffect, useRef, type CSSProperties } from "react";
import type { PortfolioApp } from "../../../domain/entities/portfolio";
import { useStageStore } from "../../store/stage_store";
import { placeShot } from "./shot_layout";

type Props = { apps: PortfolioApp[] };

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !reduceMotion;

export function ProjectsSection({ apps }: Props) {
  const shelfRef = useRef<HTMLDivElement>(null);
  const openApp = useStageStore((s) => s.openApp);
  const shelfUsed = useStageStore((s) => s.shelfUsed);

  useEffect(() => {
    const shelf = shelfRef.current;
    if (!shelf) return;

    const layout = () => {
      shelf.querySelectorAll<HTMLImageElement>(".shot-img").forEach((img) => {
        const app = apps.find((item) => item.id === img.dataset.app);
        if (!app || !img.naturalWidth) return;
        placeShot(img, app.views[Number(img.dataset.view) || 0]);
      });
    };

    const observer = new ResizeObserver(() => layout());
    shelf.querySelectorAll(".shot-clip").forEach((el) => observer.observe(el));
    shelf.querySelectorAll<HTMLImageElement>(".shot-img").forEach((img) => {
      if (img.complete && img.naturalWidth) requestAnimationFrame(layout);
      else img.addEventListener("load", () => requestAnimationFrame(layout), { once: true });
    });
    window.addEventListener("resize", layout);

    const onMove = (event: PointerEvent) => {
      const tile = (event.target as Element | null)?.closest(".app-tile");
      shelf.querySelectorAll<HTMLElement>(".handset").forEach((handset) => {
        if (!tile || handset !== tile.querySelector(".handset")) handset.style.transform = "";
      });
      if (!tile) return;
      const handset = tile.querySelector<HTMLElement>(".handset");
      if (!handset) return;
      const rect = handset.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      handset.style.transform = `translateY(-16px) rotateX(${(-py * 16).toFixed(1)}deg) rotateY(${(px * 18).toFixed(1)}deg)`;
    };
    const onLeave = () => {
      shelf.querySelectorAll<HTMLElement>(".handset").forEach((handset) => {
        handset.style.transform = "";
      });
    };

    if (finePointer) {
      shelf.addEventListener("pointermove", onMove);
      shelf.addEventListener("pointerleave", onLeave);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", layout);
      shelf.removeEventListener("pointermove", onMove);
      shelf.removeEventListener("pointerleave", onLeave);
    };
  }, [apps]);

  return (
    <section id="projects">
      <div className="container">
        <span className="section-tag fade-up">02. Work</span>
        <h2 className="section-title with-lead fade-up">Apps you can open</h2>
        <p className="section-lead fade-up">Open any phone. Tap the screen to flip through real pages from the app.</p>
        <p className="shelf-hint fade-up">Swipe to browse apps</p>
        <div className={`app-shelf${shelfUsed ? " used" : ""}`} id="appShelf" ref={shelfRef}>
          {apps.map((app, index) => (
            <button
              type="button"
              className={`app-tile fade-up delay-${((index % 3) + 1) * 100}`}
              data-app={app.id}
              key={app.id}
              onClick={() => {
                if (!(history.state && history.state.appStage)) {
                  history.pushState({ appStage: app.id }, "");
                }
                openApp(app.id);
              }}
            >
              <span className="device-slot">
                <span className={`handset${app.device === "tablet" ? " is-tablet" : ""}`} style={{ "--app": app.accent } as CSSProperties}>
                  <span className="side-btn a" />
                  <span className="side-btn b" />
                  <span className="handset-screen shot-clip">
                    <img className="shot-img" src={app.views[0].image || app.image} alt="" data-app={app.id} data-view="0" />
                  </span>
                  <span className="home-bar" />
                </span>
              </span>
              <span className="app-tile-copy">
                <span className="app-tile-name">{app.title}</span>
                <span className="app-tile-meta">{app.type}</span>
                <span className="open-cue">Open app</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
