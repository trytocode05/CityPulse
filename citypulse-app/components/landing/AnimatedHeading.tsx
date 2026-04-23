"use client";

import { useEffect, useState } from "react";

interface AnimatedHeadingProps {
  text: string;
  initialDelay?: number;
  charDelay?: number;
  className?: string;
}

export function AnimatedHeading({
  text,
  initialDelay = 200,
  charDelay = 30,
  className = "",
}: AnimatedHeadingProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), initialDelay);
    return () => clearTimeout(timer);
  }, [initialDelay]);

  const lines = text.split("\n");

  return (
    <h1 className={className} style={{ letterSpacing: "-0.04em" }}>
      {lines.map((line, lineIndex) => {
        const chars = line.split("");
        const lineLength = chars.length;

        const lineElement = (
          <span key={lineIndex} className="block">
            {chars.map((char, charIndex) => {
              const delay = lineIndex * lineLength * charDelay + charIndex * charDelay;

              return (
                <span
                  key={`${lineIndex}-${charIndex}`}
                  className="inline-block"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate
                      ? "translateX(0)"
                      : "translateX(-18px)",
                    transition: `opacity 500ms ease, transform 500ms ease`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </span>
        );

        return lineElement;
      })}
    </h1>
  );
}
