"use client";

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import { motion as Motion, type Easing } from "motion/react";

export interface PulsatingBorderProps {
  children?: ReactNode;
  borderRadius?: string;
  borderWidth?: number;
  spread?: number;
  duration?: number;
  easing?: Easing | Array<Easing>;
  repeat?: number;
  autoscaleRadius?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function PulsatingBorder({
  children,
  borderRadius = "16px",
  borderWidth = 2,
  spread = 10,
  duration = 1.8,
  easing = "easeIn",
  repeat = Infinity,
  autoscaleRadius = true,
  className = "",
  style,
}: PulsatingBorderProps) {
  const baseRadius = parseFloat(borderRadius);

  const [scaledRadius, setScaledRadius] = useState(baseRadius);

  useEffect(() => {
    if (!autoscaleRadius) {
      setScaledRadius(baseRadius);
      return;
    }

    const update = () => {
      const scale = Math.min(1, window.innerWidth / 1440);
      setScaledRadius(Math.max(4, baseRadius * scale));
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [autoscaleRadius, baseRadius]);

  const shadowFrames = useMemo(
    () => [
      `0 0 0 0px rgba(255,255,255,0.9),
      0 0 0 0px rgba(255,255,255,0.6)`,

      `0 0 0 ${spread * 0.5}px rgba(255,255,255,0.5),
      0 0 ${spread * 0.8}px 0 rgba(255,255,255,0.3)`,

      `0 0 0 ${spread}px rgba(255,255,255,0),
      0 0 ${spread}px 0 rgba(255,255,255,0)`,
    ],
    [spread],
  );

  const radiusPx = `${scaledRadius}px`;

  return (
    <div
      className={`relative isolate inline-flex items-center justify-center ${className}`}
      style={{ borderRadius: radiusPx, ...style }}
    >
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{
          borderRadius: radiusPx,
          border: `${borderWidth}px solid rgba(255,255,255,0.25)`,
        }}
      />

      <Motion.div
        aria-hidden
        className='pointer-events-none absolute inset-0'
        style={{ borderRadius: radiusPx }}
        animate={{ boxShadow: shadowFrames }}
        transition={{
          duration,
          ease: easing,
          repeat,
          times: [0, 0.5, 1],
        }}
      />

      <div className='relative'>{children}</div>
    </div>
  );
}
