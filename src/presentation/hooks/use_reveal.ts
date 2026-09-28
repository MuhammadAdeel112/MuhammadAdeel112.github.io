import { useEffect, type RefObject } from "react";

export function useReveal(root?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = root?.current ?? document;
    const nodes = scope.querySelectorAll(".fade-up, .timeline");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { root: null, rootMargin: "80px 0px", threshold: 0.05 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [root]);
}
