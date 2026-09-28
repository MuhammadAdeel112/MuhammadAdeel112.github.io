import { useEffect } from "react";
import { useUiStore } from "../store/ui_store";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Expertise" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const scrolled = useUiStore((s) => s.headerScrolled);
  const menuOpen = useUiStore((s) => s.menuOpen);
  const toggleMenu = useUiStore((s) => s.toggleMenu);
  const setHeaderScrolled = useUiStore((s) => s.setHeaderScrolled);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [setHeaderScrolled]);

  return (
    <header id="header" className={scrolled ? "scrolled" : ""}>
      <div className="container nav-container">
        <a href="#" className="logo font-syne">
          MA<span>.</span>
        </a>
        <ul className="nav-links">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
        <button
          className={`menu-btn${menuOpen ? " active" : ""}`}
          id="menuBtn"
          aria-label="Toggle Menu"
          aria-controls="mobileNav"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export const navLinks = links;
