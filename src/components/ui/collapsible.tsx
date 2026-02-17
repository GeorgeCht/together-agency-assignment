"use client";

import { useState, useId } from "react";
import { AnimatePresence, motion } from "motion/react";

import { Separator } from "@/components/ui/separator";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width='12'
      height='12'
      viewBox='0 0 16 16'
      fill='none'
      className='shrink-0 text-white/75'
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.275, ease: [0.15, 1, 0.15, 1] }}
      aria-hidden='true'
    >
      <path
        d='M13 6L8 11L3 6'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='square'
        strokeLinejoin='round'
      />
    </motion.svg>
  );
};

interface CollapsibleItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  showSeperator?: boolean;
  showChevron?: boolean;
}

function CollapsibleItem({
  title,
  children,
  defaultOpen = false,
  showSeperator = true,
  showChevron = true,
}: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();
  const contentId = `${id}-content`;
  const triggerId = `${id}-trigger`;

  return (
    <div className='dark'>
      {showSeperator && (
        <Separator dashWidth={2} dashGap={5} className='opacity-75' />
      )}
      <button
        id={triggerId}
        type='button'
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((prev) => !prev)}
        className='flex w-full items-center justify-between gap-4 py-3 text-left text-base font-medium text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950'
      >
        <span>{title}</span>
        {showChevron && <ChevronIcon isOpen={isOpen} />}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            role='region'
            aria-labelledby={triggerId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.15, 1, 0.15, 1] }}
            className='overflow-hidden'
          >
            <div className='pb-3 text-sm text-muted-foreground leading-relaxed'>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CollapsibleProps {
  children: React.ReactNode;
  className?: string;
}

const CollapsibleRoot = ({ children, className = "" }: CollapsibleProps) => {
  return <div className={className}>{children}</div>;
};

export const Collapsible = {
  Item: CollapsibleItem,
  Root: CollapsibleRoot,
};
