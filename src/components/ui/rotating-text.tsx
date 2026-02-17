"use client";

import type React from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  memo,
} from "react";
import {
  motion as Motion,
  AnimatePresence,
  type Transition,
  type VariantLabels,
  type Target,
  type TargetAndTransition,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export interface RotatingTextProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Motion.span>,
  "children" | "transition" | "initial" | "animate" | "exit"
> {
  texts: Array<string>;
  prefix?: string;
  suffix?: string;
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  loop?: boolean;
  auto?: boolean;
  onNext?: (index: number) => void;
  mainClassName?: string;
  wordClassName?: string;
  staticWordClassName?: string;
}

const Word = memo(
  ({
    word,
    index,
    isLast,
    initial,
    animate,
    exit,
    transition,
    staggerDuration,
    wordClassName,
  }: {
    word: string;
    index: number;
    isLast: boolean;
    initial: RotatingTextProps["initial"];
    animate: RotatingTextProps["animate"];
    exit: RotatingTextProps["exit"];
    transition: RotatingTextProps["transition"];
    staggerDuration: number;
    wordClassName?: string;
  }) => (
    <span className='inline-flex'>
      <Motion.span
        initial={initial}
        animate={animate}
        exit={exit}
        transition={{
          ...transition,
          delay: index * staggerDuration,
        }}
        className={cn("inline-block", wordClassName)}
      >
        {word}
      </Motion.span>
      {!isLast && <span className='whitespace-pre'> </span>}
    </span>
  ),
);

Word.displayName = "Word";

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      prefix = "",
      suffix = "",
      transition = { ease: "circInOut", duration: 0.375 },
      initial = { y: "20%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-20%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0.05,
      loop = true,
      auto = true,
      onNext,
      mainClassName,
      wordClassName,
      staticWordClassName,
      ...rest
    },
    ref,
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const prefixWords = useMemo(
      () => (prefix ? prefix.split(" ") : []),
      [prefix],
    );
    const suffixWords = useMemo(
      () => (suffix ? suffix.split(" ") : []),
      [suffix],
    );
    const words = useMemo(
      () => texts[currentTextIndex].split(" "),
      [texts, currentTextIndex],
    );

    const fullText = useMemo(() => {
      const parts = [];
      if (prefix) parts.push(prefix);
      parts.push(texts[currentTextIndex]);
      if (suffix) parts.push(suffix);
      return parts.join(" ");
    }, [prefix, texts, currentTextIndex, suffix]);

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        if (onNext) onNext(newIndex);
      },
      [onNext],
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) {
        handleIndexChange(nextIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) {
        handleIndexChange(prevIndex);
      }
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) {
          handleIndexChange(validIndex);
        }
      },
      [texts.length, currentTextIndex, handleIndexChange],
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) {
        handleIndexChange(0);
      }
    }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(
      ref,
      () => ({
        next,
        previous,
        jumpTo,
        reset,
      }),
      [next, previous, jumpTo, reset],
    );

    useEffect(() => {
      if (!auto) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto]);

    return (
      <Motion.span
        className={cn(
          "flex flex-wrap whitespace-pre-wrap relative",
          mainClassName,
        )}
        {...rest}
        layout
        transition={transition}
      >
        <span className='sr-only'>{fullText}</span>

        <AnimatePresence
          mode={animatePresenceMode}
          initial={animatePresenceInitial}
        >
          <Motion.span
            key={currentTextIndex}
            className='flex flex-wrap whitespace-pre-wrap relative'
            layout
            aria-hidden='true'
          >
            {prefixWords.map((word, index) => (
              <Motion.em key={index} className='inline-flex'>
                <Motion.span
                  layout
                  className={cn("inline-block", staticWordClassName)}
                >
                  {word}
                </Motion.span>
                {index !== prefixWords.length - 1 && (
                  <span className='whitespace-pre'> </span>
                )}
              </Motion.em>
            ))}

            {words.map((word, index) => (
              <Word
                key={index}
                word={word}
                index={index}
                isLast={index === words.length - 1}
                initial={initial}
                animate={animate}
                exit={exit}
                transition={transition}
                staggerDuration={staggerDuration}
                wordClassName={wordClassName}
              />
            ))}

            {suffixWords.map((word, index) => (
              <Motion.em key={index} className='inline-flex'>
                <Motion.span
                  layout
                  className={cn("inline-block", staticWordClassName)}
                >
                  {word}
                </Motion.span>
                {index !== suffixWords.length - 1 && (
                  <span className='whitespace-pre'> </span>
                )}
              </Motion.em>
            ))}
          </Motion.span>
        </AnimatePresence>
      </Motion.span>
    );
  },
);

RotatingText.displayName = "RotatingText";
export { RotatingText };
