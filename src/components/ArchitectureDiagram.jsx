import './ArchitectureDiagram.css';

export default function ArchitectureDiagram({ nodes }) {
  return (
    <div className="arch-diagram">
      {nodes.map((row, i) => (
        <div key={i}>
          {i > 0 && <div className="arch-arrow">&darr;</div>}
          <div className="arch-row">
            {row.map((node, j) => (
              <div key={j}>
                {j > 0 && <span className="arch-arrow arch-arrow--right">&rarr;</span>}
                <span className={`arch-node ${node.variant ? `arch-node--${node.variant}` : ''}`}>
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
