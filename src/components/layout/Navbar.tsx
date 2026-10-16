import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "../../data/content";
import { cn } from "../../lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [revealed, setRevealed] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      if (window.scrollY > 80) { setRevealed(window.matchMedia("(hover: hover)").matches && Boolean(headerRef.current?.matches(":hover"))); }
      if (window.scrollY < window.innerHeight * 0.4) setActive("home");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-28% 0px -60% 0px", threshold: [0.01, 0.2, 0.5] },
    );

    navLinks.forEach((link) => {
      const element = document.querySelector(link.href);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setRevealed(false);
      }
    };
    const onOutsidePointer = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
        setRevealed(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutsidePointer);
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutsidePointer);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className={cn(
        "pro-nav",
        scrolled || menuOpen ? "is-scrolled" : "",
        scrolled && !revealed && !menuOpen ? "is-auto-hidden" : "",
      )}
      onPointerEnter={(event) => {
        if (event.pointerType !== "touch") setRevealed(true);
      }}
      onPointerLeave={() => setRevealed(false)}
      onClick={(event) => {
        const link = event.target instanceof Element ? event.target.closest("a") : null;
        if (link) {
          setMenuOpen(false);
          setRevealed(false);
          if (event.detail > 0 && link instanceof HTMLElement) link.blur();
        }
      }}
    >
      <div className="pro-nav-reveal-zone" aria-hidden="true" />
      {scrolled && !menuOpen && (
        <button
          type="button"
          className="pro-nav-peek"
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen(true)}
        >
          <Menu size={20} />
        </button>
      )}
      <div className="pro-nav-shell">
        <a
          href="#home"
          className="pro-brand"
          aria-label="Mae Ann Bodiongan — Home"
        >
          <span>MB</span>
          <strong>Mae Ann Bodiongan</strong>
        </a>

        <nav className="pro-nav-links" aria-label="Primary navigation">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="pro-nav-actions">
          <a href="#contact" className="pro-nav-cta">
            Contact
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="pro-menu-btn"
          >
            {menuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="pro-mobile-menu"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="pro-mobile-contact"
          >
            Contact
          </a>
        </nav>
      )}
    </header>
  );
}
