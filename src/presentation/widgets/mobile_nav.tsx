import { useEffect } from "react";
import { useUiStore } from "../store/ui_store";
import { navLinks } from "./site_header";

export function MobileNav() {
  const open = useUiStore((s) => s.menuOpen);
  const setMenuOpen = useUiStore((s) => s.setMenuOpen);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const media = window.matchMedia("(min-width: 840px)");
    const onMedia = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onMedia);
    return () => {
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onMedia);
    };
  }, [setMenuOpen]);

  return (
    <div className={`mobile-nav${open ? " active" : ""}`} id="mobileNav">
      <ul>
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="mob-link" onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
