import Link from "next/link";

export default function NotFound() {
  return (
    <div className="pt-[var(--nav-height)] min-h-screen flex items-center">
      <div className="site-container">
        <p className="font-mono text-xs text-[var(--accent)] mb-6 tracking-widest">404</p>
        <h1 className="text-display-xl font-light text-[var(--text-primary)] mb-4 leading-none">
          Page not found
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] mb-10">
          This page doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="text-sm text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors duration-200"
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
