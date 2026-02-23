import './SectionBlock.css';

export default function SectionBlock({ title, children, className = '' }) {
  return (
    <section className={`section-block fade-in ${className}`}>
      <h2 className="section-block-title">{title}</h2>
      <div className="accent-line" />
      <div className="section-block-content">{children}</div>
    </section>
  );
}
