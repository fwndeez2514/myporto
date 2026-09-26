const skills = [
  "Video Editing",
  "Motion Graphic",
  "Graphic Design",
  "Color Grading",
  "AMV / PMV",
  "After Effects",
  "Premiere Pro",
  "DaVinci Resolve",
  "Illustrator",
  "Photoshop",
  "Kinetic Typography",
  "Brand Identity",
  "Social Media",
  "Storytelling",
];

const Separator = () => (
  <span className="mx-6 text-[var(--accent)] opacity-60" aria-hidden="true">✦</span>
);

export default function Marquee() {
  const items = [...skills, ...skills]; // duplicate for seamless loop

  return (
    <div
      className="marquee-container py-5 border-t border-b border-[var(--border-subtle)] overflow-hidden"
      aria-label="Skills ticker"
    >
      <div className="marquee-track">
        {items.map((skill, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-sm font-light tracking-[0.08em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-200 whitespace-nowrap">
              {skill}
            </span>
            <Separator />
          </span>
        ))}
      </div>
    </div>
  );
}
