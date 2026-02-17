"use client";

import { memo, useRef, useMemo, useState, useEffect } from "react";
import { motion as Motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type TransitionMode = "standard" | "continuous";

interface AnimatedCounterProps {
  text: string;
  duration?: number;
  transitionMode?: TransitionMode;
  cleanupDelay?: number;
  className?: string;
  delay?: number;
}

interface DigitColumnProps {
  target: number;
  duration: number;
  delay: number;
  animate: boolean;
  transitionMode: TransitionMode;
  extraRevolutions: number;
  reducedMotion: boolean;
  showExtraDigits: boolean;
}

function parseText(text: string): {
  prefix: string;
  digits: string;
  suffix: string;
} {
  const firstDigitIdx = text.search(/\d/);
  if (firstDigitIdx === -1) {
    return { prefix: text, digits: "", suffix: "" };
  }

  const lastDigitIdx = (() => {
    for (let i = text.length - 1; i >= 0; i--) {
      if (/\d/.test(text[i])) return i;
    }
    return -1;
  })();

  const prefix = text.slice(0, firstDigitIdx);
  let middle = text.slice(firstDigitIdx, lastDigitIdx + 1);
  let suffix = text.slice(lastDigitIdx + 1);

  const dotIdx = middle.indexOf(".");
  if (dotIdx !== -1) {
    suffix = middle.slice(dotIdx) + suffix;
    middle = middle.slice(0, dotIdx);
  }

  return { prefix, digits: middle, suffix };
}

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

const DigitColumn = memo(function DigitColumn({
  target,
  duration,
  delay,
  animate,
  transitionMode,
  extraRevolutions,
  reducedMotion,
  showExtraDigits,
}: DigitColumnProps) {
  const totalCells =
    transitionMode === "continuous" && showExtraDigits
      ? extraRevolutions * 10 + target
      : target;

  const yTo = `-${totalCells}em`;

  const cells: Array<number> = useMemo(() => {
    if (transitionMode === "standard" || !showExtraDigits) {
      return [...DIGITS];
    }
    const arr: Array<number> = [];
    for (let rev = 0; rev < extraRevolutions; rev++) {
      arr.push(...DIGITS);
    }
    for (let d = 0; d <= target; d++) {
      arr.push(d);
    }
    return arr;
  }, [transitionMode, extraRevolutions, target, showExtraDigits]);

  return (
    <div
      className='relative inline-flex overflow-hidden'
      style={{
        height: "1em",
        width: "0.6em",
        maskImage: `linear-gradient(to bottom,
          transparent,
          black 0.125em,
          black calc(100% - 0.125em),
          transparent
        )`,
      }}
      aria-hidden='true'
    >
      <Motion.div
        initial={{ y: 0 }}
        animate={animate ? { y: yTo } : { y: 0 }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration,
                delay,
                ease: [0.15, 1, 0.2, 1],
              }
        }
        className='flex flex-col'
        style={{ willChange: animate ? "transform" : "auto" }}
      >
        {cells.map((d, i) => (
          <span
            key={i}
            className='flex h-[1em] items-center justify-center tabular-nums'
          >
            {d}
          </span>
        ))}
      </Motion.div>
    </div>
  );
});

const AnimatedCounter = memo(function AnimatedCounter({
  text,
  duration = 2,
  delay = 0,
  transitionMode = "standard",
  cleanupDelay = 1000,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  const resolvedMode: TransitionMode = prefersReducedMotion
    ? "standard"
    : transitionMode;

  const [hasTriggered, setHasTriggered] = useState(false);
  const [showExtraDigits, setShowExtraDigits] = useState(true);

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
      setShowExtraDigits(true);
    }
  }, [isInView, hasTriggered]);

  useEffect(() => {
    if (!hasTriggered || resolvedMode !== "continuous") return;

    const longestDelay = duration + cleanupDelay;
    const timer = setTimeout(() => {
      setShowExtraDigits(false);
    }, longestDelay * 1000);

    return () => clearTimeout(timer);
  }, [hasTriggered, duration, cleanupDelay, resolvedMode]);

  const shouldAnimate = hasTriggered;

  const { prefix, digits, suffix } = useMemo(() => parseText(text), [text]);
  const chars = useMemo(() => digits.split(""), [digits]);
  const digitCount = useMemo(
    () => chars.filter((c) => /\d/.test(c)).length,
    [chars],
  );

  const staggerStep =
    resolvedMode === "continuous"
      ? 0
      : digitCount > 1
        ? (duration * 0.3) / (digitCount - 1)
        : 0;

  let digitIdx = 0;

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-baseline font-sans tabular-nums",
        className,
      )}
      role='presentation'
    >
      {prefix && <span aria-hidden='true'>{prefix}</span>}

      {chars.map((char, i) => {
        if (/\d/.test(char)) {
          const target = parseInt(char, 10);
          const currentDigitIdx = digitIdx;
          digitIdx++;

          const extraRevolutions =
            resolvedMode === "continuous" ? digitCount - currentDigitIdx : 0;

          return (
            <DigitColumn
              key={`digit-${i}`}
              target={target}
              duration={prefersReducedMotion ? 0 : duration}
              delay={currentDigitIdx * staggerStep + delay}
              animate={shouldAnimate}
              transitionMode={resolvedMode}
              extraRevolutions={extraRevolutions}
              reducedMotion={!!prefersReducedMotion}
              showExtraDigits={showExtraDigits}
            />
          );
        }
        return (
          <span key={`sep-${i}`} aria-hidden='true'>
            {char}
          </span>
        );
      })}

      {suffix && <span aria-hidden='true'>{suffix}</span>}
    </span>
  );
});

export { AnimatedCounter };
