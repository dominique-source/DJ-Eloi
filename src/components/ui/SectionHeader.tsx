interface SectionHeaderProps {
  label: string;
  title?: string;
  onAccent?: boolean;
}

/** Label ALL CAPS (tracking large) + titre display optionnel. */
export function SectionHeader({ label, title, onAccent = false }: SectionHeaderProps) {
  return (
    <div>
      <p
        className={`text-xs uppercase tracking-caps ${
          onAccent ? 'text-[#0a0a0a]/60' : 'text-muted'
        }`}
      >
        {label}
      </p>
      {title ? (
        <h2 className="mt-4 font-display text-4xl font-black italic tracking-title md:text-6xl">
          {title}
        </h2>
      ) : null}
    </div>
  );
}
