import { useEffect, useRef } from "react";

export function useCursor(enabled: boolean) {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    const onMove = (event: MouseEvent) => {
      dot.style.left = `${event.clientX}px`;
      dot.style.top = `${event.clientY}px`;
      outline.animate(
        { left: `${event.clientX}px`, top: `${event.clientY}px` },
        { duration: 500, fill: "forwards" },
      );
    };

    const onOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest("a, button, .glass-card, .handset")) {
        outline.classList.add("hovering");
      }
    };

    const onOut = (event: MouseEvent) => {
      const el = (event.target as Element | null)?.closest("a, button, .glass-card, .handset");
      if (el && !el.contains(event.relatedTarget as Node | null)) {
        outline.classList.remove("hovering");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [enabled]);

  return { dotRef, outlineRef };
}
