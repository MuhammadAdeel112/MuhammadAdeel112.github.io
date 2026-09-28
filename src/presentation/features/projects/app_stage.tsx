import { useEffect, useRef, type CSSProperties } from "react";
import { getPortfolioRepository } from "../../../core/di/locator";
import { useStageStore } from "../../store/stage_store";
import { placeShot } from "./shot_layout";

const reduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches && !reduceMotion;

function burstFromPhone(handset: HTMLElement, color: string) {
  const rect = handset.getBoundingClientRect();
  for (let i = 0; i < 12; i += 1) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.left = `${rect.left + rect.width / 2}px`;
    spark.style.top = `${rect.top + rect.height * 0.42}px`;
    spark.style.background = color;
    spark.style.setProperty("--dx", `${Math.round(Math.random() * 180 - 90)}px`);
    spark.style.setProperty("--dy", `${Math.round(Math.random() * -140 - 24)}px`);
    document.body.appendChild(spark);
    window.setTimeout(() => spark.remove(), 720);
  }
}

export function AppStage() {
  const repo = getPortfolioRepository();
  const isOpen = useStageStore((s) => s.isOpen);
  const appId = useStageStore((s) => s.appId);
  const screenIndex = useStageStore((s) => s.screenIndex);
  const splashHidden = useStageStore((s) => s.splashHidden);
  const closeApp = useStageStore((s) => s.closeApp);
  const hideSplash = useStageStore((s) => s.hideSplash);
  const stepScreen = useStageStore((s) => s.stepScreen);
  const app = appId ? repo.getAppById(appId) : undefined;

  const stageRef = useRef<HTMLDivElement>(null);
  const handsetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (history.state?.appStage) history.replaceState(null, "");
    const onPop = () => {
      if (useStageStore.getState().isOpen) closeApp();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [closeApp]);

  useEffect(() => {
    if (!isOpen || !app) return;
    const timer = window.setTimeout(hideSplash, reduceMotion ? 0 : 720);
    closeRef.current?.focus({ preventScroll: true });
    return () => window.clearTimeout(timer);
  }, [isOpen, app, hideSplash]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !app) return;
    const layout = () => {
      track.querySelectorAll<HTMLImageElement>(".shot-img").forEach((img) => {
        const view = app.views[Number(img.dataset.view) || 0];
        if (view && img.naturalWidth) placeShot(img, view);
      });
    };
    const observer = new ResizeObserver(layout);
    track.querySelectorAll(".shot-clip").forEach((el) => observer.observe(el));
    Promise.all(
      [...track.querySelectorAll("img")].map((img) => img.decode().catch(() => undefined)),
    ).then(() => requestAnimationFrame(layout));
    return () => observer.disconnect();
  }, [app, isOpen]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${-screenIndex * 100}%)`;
  }, [screenIndex]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (!useStageStore.getState().isOpen) return;
      if (event.key === "Escape") requestClose();
      if (event.key === "ArrowRight") advance(1);
      if (event.key === "ArrowLeft") advance(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    const handset = handsetRef.current;
    const glare = glareRef.current;
    if (!finePointer || !handset || !glare) return;
    const onMove = (event: PointerEvent) => {
      const rect = handset.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      handset.style.setProperty("--rx", `${(-py * 14).toFixed(2)}deg`);
      handset.style.setProperty("--ry", `${(px * 16).toFixed(2)}deg`);
      glare.style.setProperty("--gx", `${50 + px * 46}%`);
      glare.style.setProperty("--gy", `${28 + py * 36}%`);
    };
    const onLeave = () => {
      handset.style.setProperty("--rx", "0deg");
      handset.style.setProperty("--ry", "0deg");
      handset.style.setProperty("--press", "1");
    };
    handset.addEventListener("pointermove", onMove);
    handset.addEventListener("pointerleave", onLeave);
    return () => {
      handset.removeEventListener("pointermove", onMove);
      handset.removeEventListener("pointerleave", onLeave);
    };
  }, [isOpen]);

  function requestClose() {
    if (!useStageStore.getState().isOpen) return;
    if (history.state && history.state.appStage) {
      history.back();
      return;
    }
    closeApp();
  }

  function advance(dir: number) {
    if (!app) return;
    const result = stepScreen(dir, app.views.length);
    const handset = handsetRef.current;
    if (result === "press" && handset) {
      handset.style.setProperty("--press", "0.96");
      window.setTimeout(() => handset.style.setProperty("--press", "1"), 160);
    }
    if (result === "moved" && handset && !reduceMotion) {
      burstFromPhone(handset, app.accent);
    }
  }

  if (!app) {
    return <div className="app-stage" id="appStage" ref={stageRef} />;
  }

  const view = app.views[screenIndex];

  return (
    <div
      className={`app-stage${isOpen ? " open" : ""}`}
      id="appStage"
      ref={stageRef}
      style={{ "--app": app.accent } as CSSProperties}
      onClick={(event) => {
        if (event.target === stageRef.current) requestClose();
      }}
    >
      <button type="button" className="stage-close" ref={closeRef} aria-label="Close app" onClick={requestClose}>
        ×
      </button>
      <div className="stage-panel" id="stagePanel">
        <div className="stage-copy">
          <p className="stage-kicker">{app.type}</p>
          <h3 className="stage-title font-syne">{app.title}</h3>
          <p className={`stage-screen${splashHidden ? " is-pop" : ""}`}>
            {view.name} · {screenIndex + 1} / {app.views.length}
          </p>
          <p className="stage-desc">{app.desc}</p>
          <div className="skill-tags">
            {app.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="stage-actions">
            <button type="button" onClick={() => advance(-1)}>
              Previous
            </button>
            <button type="button" className="primary" onClick={() => advance(1)}>
              {app.views.length < 2 ? "Tap phone" : "Next screen"}
            </button>
          </div>
        </div>
        <div className="stage-device-col">
          <div
            className={`handset stage-device${app.device === "tablet" ? " is-tablet" : ""}`}
            id="stageHandset"
            ref={handsetRef}
            role="button"
            tabIndex={0}
            aria-label="Show the next screen"
            style={{ "--app": app.accent } as CSSProperties}
            onPointerDown={(event) => {
              pointer.current = { x: event.clientX, y: event.clientY };
              handsetRef.current?.style.setProperty("--press", "0.965");
            }}
            onPointerUp={(event) => {
              handsetRef.current?.style.setProperty("--press", "1");
              const dx = event.clientX - pointer.current.x;
              const dy = event.clientY - pointer.current.y;
              if (Math.abs(dx) < 14 && Math.abs(dy) < 14) advance(1);
              else if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) advance(dx < 0 ? 1 : -1);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                advance(1);
              }
            }}
          >
            <span className="side-btn a" />
            <span className="side-btn b" />
            <div className="handset-screen">
              <div className={`splash${splashHidden ? " hide" : ""}`}>
                <div className="splash-mark">{app.mark}</div>
                <div className="splash-name">{app.title}</div>
              </div>
              <div className="glare" ref={glareRef} />
              <div className="shot-track" id="stageTrack" ref={trackRef}>
                {app.views.map((item, index) => (
                  <div className="shot-clip" key={item.image}>
                    <img className="shot-img" alt="" src={item.image} data-app={app.id} data-view={String(index)} />
                  </div>
                ))}
              </div>
            </div>
            <span className="home-bar" />
          </div>
          <div className="stage-dots">
            {app.views.map((item, index) => (
              <span className={`dot${index === screenIndex ? " is-on" : ""}`} key={item.name} />
            ))}
          </div>
          <p className="tap-hint">
            {app.views.length < 2 ? "This build opens on its main screen" : "Tap the phone for the next screen"}
          </p>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {app.title}, {view.name}
      </p>
    </div>
  );
}
