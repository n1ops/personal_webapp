import './BentoGrid.css';

export default function BentoGrid({ children, className = '' }) {
  return (
    <div className={`bento-grid ${className}`}>
      {children}
    </div>
  );
}

export function BentoCard({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
}) {
  return (
    <div
      className={`bento-card ${className}`}
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  );
}
