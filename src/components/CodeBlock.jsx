import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import './CodeBlock.css';

export default function CodeBlock({ code, language = 'python', typingSpeed = 30 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayedCode, setDisplayedCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < code.length) {
        setDisplayedCode(code.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [isInView, code, typingSpeed]);

  return (
    <div className="code-block" ref={ref}>
      <div className="code-block-header">
        <div className="code-block-dots">
          <span className="code-dot code-dot--red" />
          <span className="code-dot code-dot--yellow" />
          <span className="code-dot code-dot--green" />
        </div>
        <span className="code-block-lang">{language}</span>
      </div>
      <pre className="code-block-body">
        <code>
          {displayedCode}
          {!isComplete && <span className="code-cursor">|</span>}
        </code>
      </pre>
    </div>
  );
}
