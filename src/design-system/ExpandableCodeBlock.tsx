"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ExpandableCodeBlock.module.css";

type ExpandableCodeBlockProps = Readonly<{
  children: string;
}>;

export function ExpandableCodeBlock({ children }: ExpandableCodeBlockProps) {
  const code = children.trim();
  const rootRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const pre = preRef.current;

    if (!root || !pre) {
      return;
    }

    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const previewHeight = Number.parseFloat(
          window.getComputedStyle(root).getPropertyValue("--code-preview-height"),
        );

        setIsExpandable(pre.scrollHeight > previewHeight + 1);
      });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(root);

    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [code]);

  return (
    <div ref={rootRef} className={styles.root} data-expanded={isExpanded} data-expandable={isExpandable}>
      <div className={styles.codeFrame}>
        <pre ref={preRef} className={styles.code}>
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
