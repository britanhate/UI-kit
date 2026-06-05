"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ExpandableCodeBlock.module.css";

type ExpandableCodeBlockProps = Readonly<{
  children: string;
}>;

export function ExpandableCodeBlock({ children }: ExpandableCodeBlockProps) {
  const code = children.trim();
  const preRef = useRef<HTMLPreElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const [expandedHeight, setExpandedHeight] = useState<number | null>(null);

  useEffect(() => {
    const pre = preRef.current;

    if (!pre) {
      return;
    }

    const measure = () => {
      const fullHeight = pre.scrollHeight;
      const previewHeight = pre.clientHeight;

      setExpandedHeight(fullHeight);

      if (!isExpanded) {
        setIsExpandable(fullHeight > previewHeight + 1);
      }
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(pre);

    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [code, isExpanded]);

  return (
    <div className={styles.root} data-expanded={isExpanded} data-expandable={isExpandable}>
      <div className={styles.codeFrame}>
        <pre
          ref={preRef}
          className={styles.code}
          style={isExpanded && expandedHeight ? { maxHeight: `${expandedHeight + 2}px` } : undefined}
        >
          <code>{code}</code>
        </pre>

        {isExpandable && !isExpanded ? <div className={styles.fade} aria-hidden="true" /> : null}
      </div>

      {isExpandable ? (
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={isExpanded}
          onClick={() => setIsExpanded((current) => !current)}
        >
          {isExpanded ? "Згорнути" : "Розгорнути"}
        </button>
      ) : null}
    </div>
  );
}
