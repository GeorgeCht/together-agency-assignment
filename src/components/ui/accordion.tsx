"use client";

import Link from "next/link";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";

import { IconArrowRight } from "@/components/ui/icon-arrow";
import { useIsDesktop } from "@/lib/hooks/use-desktop";
import { cn } from "@/lib/utils";

interface TimedAccordionItem {
  title: string;
  content: string;
  url: string;
}

interface TimedAccordionProps extends React.ComponentPropsWithoutRef<"div"> {
  items: Array<TimedAccordionItem>;
  interval?: number;
  activeIndex?: number;
  onActiveIndexChange?: (index: number) => void;
}

function useAccordionTimer({
  itemsLength,
  interval,
  activeIndex,
  setActiveIndex,
}: {
  itemsLength: number;
  interval: number;
  activeIndex: number;
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
}) {
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % itemsLength);
    }, interval);
  }, [interval, itemsLength, setActiveIndex]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: *
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeIndex, startTimer]);

  const handleManualChange = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return { direction, handleManualChange };
}

function DesktopAccordion({
  items,
  activeIndex,
  onItemClick,
  interval,
}: {
  items: TimedAccordionItem[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  interval: number;
}) {
  return (
    <Motion.div
      key='desktop'
      transition={{ duration: 0.825, ease: "circInOut" }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
    >
      {items.map((item, index) => {
        const isOpen = index === activeIndex;

        return (
          <div
            key={index}
            className={cn("relative pl-8", isOpen ? "mb-7" : "mb-5")}
          >
            <div className='absolute left-0 top-0 w-px h-full bg-dark-100' />
            {isOpen && (
              <Motion.div
                key={activeIndex}
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{
                  duration: interval / 1000,
                  ease: "linear",
                }}
                className='absolute left-0 top-0 w-0.5 bg-electric-500'
              />
            )}

            <button
              type='button'
              onClick={() => onItemClick(index)}
              className={cn(
                "flex w-full items-center justify-between gap-4 p-0 text-left font-medium transition-colors cursor-pointer rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950",
                isOpen
                  ? "text-dark-950"
                  : "text-dark-900/65 hover:text-dark-900",
              )}
              aria-expanded={isOpen}
            >
              <span className='text-bodylg'>{item.title}</span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <Motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.15, 1, 0.15, 1],
                  }}
                  className='overflow-hidden w-full'
                >
                  <p className='pb-6 pt-3 text-bodymd text-dark-800 leading-relaxed'>
                    {item.content}
                  </p>
                  <Link
                    href={item.url}
                    className='group flex flex-row gap-3 items-center'
                  >
                    Explore{" "}
                    <IconArrowRight className='shrink-0 size-3.5 text-dark-950/80 transition-transform group-hover:translate-x-1' />
                  </Link>
                </Motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </Motion.div>
  );
}

function MobileAccordion({
  items,
  activeIndex,
  onItemClick,
  interval,
  direction,
}: {
  items: TimedAccordionItem[];
  activeIndex: number;
  onItemClick: (index: number) => void;
  interval: number;
  direction: number;
}) {
  const activeItem = items[activeIndex];

  return (
    <Motion.div
      key='mobile'
      transition={{ duration: 0.825, ease: "circInOut" }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 25 }}
      className='flex flex-col gap-5'
    >
      <div
        className='flex gap-1.5'
        role='tablist'
        aria-label='Content sections'
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          const isCompleted = index < activeIndex;

          return (
            <button
              key={index}
              type='button'
              role='tab'
              aria-selected={isActive}
              aria-label={item.title}
              onClick={() => onItemClick(index)}
              className='relative flex-1 py-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-900 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900 rounded group'
            >
              <div className='h-0.5 w-full bg-dark-950/20 rounded-full overflow-hidden'>
                {isCompleted && (
                  <div className='h-full w-full bg-electric-500 rounded-full' />
                )}
                {isActive && (
                  <Motion.div
                    key={`mobile-progress-${activeIndex}`}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: interval / 1000,
                      ease: "linear",
                    }}
                    className='h-full bg-electric-500 rounded-full'
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className='relative overflow-hidden'>
        <AnimatePresence initial={false} mode='popLayout' custom={direction}>
          <Motion.div
            key={activeIndex}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                x: `${d * 100}%`,
                opacity: 0,
              }),
              center: {
                x: 0,
                opacity: 1,
              },
              exit: (d: number) => ({
                x: `${d * -100}%`,
                opacity: 0,
              }),
            }}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { duration: 0.5, ease: [0.15, 1, 0.15, 1] },
              opacity: { duration: 0.3 },
            }}
          >
            <span className='text-bodylg font-medium text-dark-950 mb-3'>
              {activeItem.title}
            </span>
            <p className='text-bodymd text-dark-800 text-balance leading-normal mb-6'>
              {activeItem.content}
            </p>
            <Link
              href={activeItem.url}
              className='group inline-flex flex-row gap-3 items-center text-dark-950'
            >
              Explore{" "}
              <IconArrowRight className='shrink-0 size-3.5 text-dark-950/80 transition-transform group-hover:translate-x-1' />
            </Link>
          </Motion.div>
        </AnimatePresence>
      </div>
    </Motion.div>
  );
}

export function TimedAccordion({
  items,
  interval = 5000,
  activeIndex: controlledIndex,
  onActiveIndexChange,
  className,
  ...props
}: TimedAccordionProps) {
  const isControlled = controlledIndex !== undefined;

  const [internalIndex, setInternalIndex] = useState(0);
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const setActiveIndex = useCallback(
    (next: number | ((prev: number) => number)) => {
      const resolved = typeof next === "function" ? next(activeIndex) : next;
      if (isControlled) {
        onActiveIndexChange?.(resolved);
      } else {
        setInternalIndex(resolved);
        onActiveIndexChange?.(resolved);
      }
    },
    [isControlled, activeIndex, onActiveIndexChange],
  );

  const { direction, handleManualChange } = useAccordionTimer({
    itemsLength: items.length,
    interval,
    activeIndex,
    setActiveIndex,
  });

  const isDesktop = useIsDesktop();

  if (isDesktop === undefined) {
    return (
      <div
        className={cn("relative w-full text-dark-950", className)}
        {...props}
      />
    );
  }

  return (
    <div
      className={cn("relative w-full min-h-auto lg:min-h-80", className)}
      {...props}
    >
      <AnimatePresence mode='wait'>
        {isDesktop ? (
          <DesktopAccordion
            items={items}
            activeIndex={activeIndex}
            onItemClick={handleManualChange}
            interval={interval}
          />
        ) : (
          <MobileAccordion
            items={items}
            activeIndex={activeIndex}
            onItemClick={handleManualChange}
            interval={interval}
            direction={direction}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
