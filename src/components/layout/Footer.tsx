import Link from "next/link";

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/yourhandle", id: "footer-instagram" },
  { label: "YouTube", href: "https://youtube.com/@yourhandle", id: "footer-youtube" },
  { label: "TikTok", href: "https://tiktok.com/@yourhandle", id: "footer-tiktok" },
];

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-subtle)]">

      {/* Massive watermark name — editorial signature */}
      <div
        className="absolute bottom-0 left-0 right-0 flex items-end overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
        style={{ lineHeight: 0.8 }}
      >
        <span
          className="text-[clamp(4rem,18vw,16rem)] font-black uppercase leading-none whitespace-nowrap tracking-[-0.05em] pl-4 md:pl-8"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px var(--border)",
            opacity: 0.5,
          }}
        >
          FANDI
        </span>
      </div>

      {/* Main footer content */}
      <div className="site-container pt-12 pb-8 relative z-10">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-5 h-5 border border-[var(--accent)] flex items-center justify-center" aria-hidden>
                <span className="w-1.5 h-1.5 bg-[var(--accent)]" />
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[var(--text-secondary)]">FPA</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              Creative designer &amp; editor based in Indonesia. Video, motion, and graphic design for brands and creators.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p className="label text-[var(--text-secondary)] mb-4">Navigation</p>
            <nav className="flex flex-col gap-2" aria-label="Footer navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="label text-[var(--text-secondary)] mb-4">Social</p>
            <nav className="flex flex-col gap-2" aria-label="Social media links">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-200 flex items-center gap-1.5 w-fit group"
                >
                  {link.label}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[var(--accent)]">
                    ↗
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-subtle)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[0.65rem] text-[var(--text-secondary)] tracking-widest uppercase">
            © {year} Fandi Putra Atmadatam
          </p>
          <p className="font-mono text-[0.65rem] text-[var(--text-secondary)] tracking-widest uppercase">
            Video · Motion · Design
          </p>
        </div>
      </div>
    </footer>
  );
}
