"use client";

import Image from "next/image";

import {
  motion as Motion,
  AnimatePresence,
  type Transition,
} from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { TimedAccordion } from "@/components/ui/accordion";
import { type Status, StatusBadge } from "@/components/ui/status-badge";
import { PulsatingBorder } from "@/components/ui/pulse";
import { AnimatedCounter } from "@/components/ui/animated-counter";

const ArrowsNext = () => {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>next step arrows</title>
      <path
        d='M5.39221 7.46268L2.31397 4.38439L3.19347 3.50489L7.15126 7.46268L3.19347 11.4204L2.31397 10.5409L5.39221 7.46268Z'
        fill='black'
        fillOpacity='0.2'
      />
      <path
        d='M10.9894 7.46268L7.91113 4.38439L8.79063 3.50489L12.7484 7.46268L8.79063 11.4204L7.91113 10.5409L10.9894 7.46268Z'
        fill='black'
        fillOpacity='0.2'
      />
    </svg>
  );
};

const AutomationShowcase = ({ step = 1 }: { step: 1 | 2 | 3 | 4 }) => {
  const [statuses, setStatuses] = useState<[Status, Status, Status]>([
    "idle",
    "idle",
    "idle",
  ]);

  useEffect(() => {
    setStatuses(["idle", "idle", "idle"]);

    if (step !== 1) return;

    const timers: Array<NodeJS.Timeout> = [];

    timers.push(
      setTimeout(() => {
        setStatuses((prev) => ["pending", prev[1], prev[2]]);
      }, 100),
    );

    timers.push(
      setTimeout(() => {
        setStatuses((prev) => ["complete", prev[1], prev[2]]);
      }, 2750),
    );

    timers.push(
      setTimeout(() => {
        setStatuses((prev) => [prev[0], "pending", prev[2]]);
      }, 2850),
    );

    timers.push(
      setTimeout(() => {
        setStatuses((prev) => [prev[0], "complete", prev[2]]);
      }, 3350),
    );

    timers.push(
      setTimeout(() => {
        setStatuses((prev) => [prev[0], prev[1], "pending"]);
      }, 3450),
    );

    timers.push(
      setTimeout(() => {
        setStatuses((prev) => [prev[0], prev[1], "complete"]);
      }, 3950),
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [step]);

  const transition = {
    duration: 0.825,
    ease: "circInOut",
  } as Transition;

  return (
    <div className='relative flex w-full h-full'>
      <AnimatePresence mode='wait'>
        {step === 1 && (
          <div className='flex flex-col w-full h-full items-center justify-between py-6 sm:py-10'>
            <div className='relative w-full h-full flex flex-row items-center justify-center'>
              <Motion.span
                key={`${step}-span`}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ ...transition, delay: 0 }}
                className='w-full max-sm:p-4 max-sm:py-10 max-sm:mt-16'
              >
                <Image
                  priority
                  loading='eager'
                  className='max-md:hidden'
                  src='/assets/automation-step-01-01.svg'
                  alt='Automation 1 figure'
                  width={1102}
                  height={697}
                />
                <Image
                  priority
                  loading='eager'
                  className='md:hidden self-center mx-auto'
                  src='/assets/automation-step-01-01-alt.svg'
                  alt='Automation 1 figure'
                  width={468}
                  height={465}
                />
              </Motion.span>
            </div>
            <Motion.div
              key={`${step}-below`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0.375 }}
              className='max-lg:hidden flex flex-row gap-2.5 text-[14px] font-medium leading-none tracking-tight'
            >
              <StatusBadge status={statuses[0]} />
              <span>
                Scan complete{" "}
                <span className='text-dark-950/65'>
                  (
                  <AnimatedCounter
                    delay={0.485}
                    duration={2}
                    text='2,75'
                    transitionMode='continuous'
                    className='tracking-[-0.035em]'
                  />{" "}
                  sec)
                </span>
              </span>
              <ArrowsNext />
              <StatusBadge status={statuses[1]} />
              <p>Creating bill</p>
              <ArrowsNext />
              <StatusBadge status={statuses[2]} />
              <p>Sending for approval</p>
            </Motion.div>
          </div>
        )}
        {step === 2 && (
          <div className='flex flex-col gap-8 w-full h-full items-center justify-center py-6 sm:py-10 px-6 md:px-10'>
            <Motion.span
              key={`${step}-top-span`}
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0 }}
              className='w-full flex items-center justify-center'
            >
              <PulsatingBorder borderRadius='8px'>
                <Image
                  src='/assets/automation-step-02-01.svg'
                  alt='Automation 2 figure'
                  width={580}
                  height={244}
                />
              </PulsatingBorder>
            </Motion.span>
            <Motion.span
              key={`${step}-right-span`}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0.125 }}
              className='w-full flex items-center justify-end -mr-24'
            >
              <Image
                src='/assets/automation-step-02-02.svg'
                alt='Automation 2 figure'
                width={566}
                height={193}
              />
            </Motion.span>
          </div>
        )}
        {step === 3 && (
          <div className='flex flex-col gap-6 w-full h-full items-center justify-center py-10 sm:py-10 px-6 md:px-10'>
            <Motion.span
              key={`${step}-top-span`}
              initial={{ opacity: 0, y: -25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0 }}
              className='w-full flex items-center justify-center max-sm:mt-8'
            >
              <PulsatingBorder borderRadius='8px'>
                <Image
                  src='/assets/automation-step-03-01.svg'
                  alt='Automation 3 figure'
                  width={454}
                  height={95}
                />
              </PulsatingBorder>
            </Motion.span>
            <Motion.span
              key={`${step}-bottom-span`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0 }}
              className='w-full flex items-center justify-center'
            >
              <PulsatingBorder borderRadius='8px'>
                <Image
                  src='/assets/automation-step-03-02.svg'
                  alt='Automation 3 figure'
                  width={454}
                  height={364}
                />
              </PulsatingBorder>
            </Motion.span>
          </div>
        )}
        {step === 4 && (
          <div className='flex flex-col gap-6 w-full h-full items-center justify-center py-6 sm:py-10 pl-6 md:pl-10'>
            <Motion.span
              key={`${step}-top-span`}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...transition, delay: 0 }}
              className='w-full flex items-center justify-center -mr-18 sm:-mr-32'
            >
              <PulsatingBorder borderRadius='8px'>
                <Image
                  src='/assets/automation-step-04-01.svg'
                  alt='Automation 4 figure'
                  width={773}
                  height={455}
                />
              </PulsatingBorder>
            </Motion.span>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface AutomationsProps extends React.ComponentPropsWithoutRef<"section"> {}

const AutomationsSection = ({ className, ...props }: AutomationsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcaseStep = (Math.min(activeIndex, 3) + 1) as 1 | 2 | 3 | 4;
  return (
    <>
      <section
        className={cn(
          "w-full h-fit text-dark-950 md:px-8 px-5 md:pt-41 pt-12 md:pb-32 pb-10 overflow-hidden",
          className,
        )}
        {...props}
      >
        <div className='container relative max-w-7xl mx-auto space-y-10 md:space-y-20'>
          <div className='flex flex-col justify-between rounded lg:flex-row lg:gap-8 max-lg:flex-col-reverse'>
            <div className='w-full flex flex-col lg:w-5/12 lg:max-w-130 gap-8 xl:gap-14 h-auto lg:h-164'>
              <Separator
                dashWidth={2}
                dashGap={6}
                className='opacity-45 max-lg:hidden '
              />
              <h2 className='max-lg:hidden font-tiempos-headline font-light text-balance text-[clamp(2rem,6.25vw-1rem,3rem)] leading-[1.1] tracking-tight w-full max-w-178 overflow-hidden'>
                Automate your accounts payable
              </h2>
              <TimedAccordion
                className='mt-3 md:mt-6'
                activeIndex={activeIndex}
                onActiveIndexChange={setActiveIndex}
                items={[
                  {
                    title: "Invoice Capture",
                    content:
                      "Sed ipsum orci, lobortis egestas tortor a, molestie condimentum orci. Fusce pretium maximus erat.",
                    url: "/",
                  },
                  {
                    title: "Approval Workflows",
                    content:
                      "Sed ipsum orci, lobortis egestas tortor a, molestie condimentum orci. Fusce pretium maximus erat.",
                    url: "/",
                  },
                  {
                    title: "Payment Reconciliation",
                    content:
                      "Sed ipsum orci, lobortis egestas tortor a, molestie condimentum orci. Fusce pretium maximus erat.",
                    url: "/",
                  },
                  {
                    title: "PO Matching",
                    content:
                      "Sed ipsum orci, lobortis egestas tortor a, molestie condimentum orci. Fusce pretium maximus erat.",
                    url: "/",
                  },
                ]}
              />
            </div>
            <div className='w-full flex flex-col flex-1 md:gap-8 gap-5'>
              <Separator
                dashWidth={3}
                dashGap={8}
                className='opacity-35 lg:hidden'
              />
              <h2 className='lg:hidden font-tiempos-headline font-light text-balance text-[clamp(2rem,6.25vw-1rem,3rem)] leading-[1.1] tracking-tight w-full max-w-178 overflow-hidden'>
                Automate your accounts payable
              </h2>
              <div className='block aspect-square lg:aspect-735/640 relative w-full h-full bg-electric-200/90 rounded overflow-hidden'>
                <AutomationShowcase step={showcaseStep} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator dashWidth={2} dashGap={10} />
    </>
  );
};

export { AutomationsSection };
