"use client";

import { cn } from "@/lib/utils";
import { motion as Motion, AnimatePresence } from "motion/react";

export type Status = "idle" | "pending" | "complete";

interface StatusBadgeProps {
  status: Status;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <output
      aria-label={String(status)}
      aria-live='polite'
      className={cn("size-3.75", className)}
    >
      {/* idle */}
      <AnimatePresence mode='wait'>
        {status === "idle" && (
          <Motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className='size-3.75 rounded-full border-2 border-electric-600 bg-transparent'
          />
        )}

        {/* pending */}
        {status === "pending" && (
          <Motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1, rotate: 360 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{
              opacity: { duration: 0.25, ease: "easeInOut" },
              scale: { duration: 0.25, ease: "easeInOut" },
              rotate: {
                duration: 0.8,
                ease: "linear",
                repeat: Infinity,
              },
            }}
            className='size-3.75 rounded-full bg-[conic-gradient(transparent_60deg,var(--color-electric-600))] mask-[radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-2px))]'
          />
        )}

        {/* complete */}
        {status === "complete" && (
          <Motion.div
            key={status}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.4 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 18,
            }}
            className='size-3.75 rounded-full bg-electric-600 flex items-center justify-center'
          >
            <Motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
                delay: 0.1,
              }}
              className='flex items-center justify-center'
            >
              <svg
                width={11}
                height={11}
                viewBox='0 0 11 11'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                aria-hidden='true'
                focusable='false'
              >
                <path
                  d='M4.35283 6.60452L8.35457 2.60278L8.97022 3.21843L4.35283 7.83581L1.5824 5.0654L2.19805 4.44976L4.35283 6.60452Z'
                  fill='white'
                />
              </svg>
            </Motion.span>
          </Motion.div>
        )}
      </AnimatePresence>
      <span className='sr-only'>{String(status)}</span>
    </output>
  );
}
