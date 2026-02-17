"use client";

import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { motion as Motion, useInView } from "motion/react";
import { IconArrowRight } from "@/components/ui/icon-arrow";
import { PulsatingBorder } from "@/components/ui/pulse";

const OnboardingSlideContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className='relative flex items-end justify-center w-full h-auto aspect-628/420 bg-[url(/assets/features-bg-01.avif)] bg-cover rounded overflow-hidden pt-6 md:pt-10 px-12 md:px-20'
    >
      <Motion.span
        className='-mb-2'
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.375, ease: "circInOut", delay: 0.125 }}
      >
        <PulsatingBorder borderRadius='8px'>
          <Image
            src='/assets/features-onboarding-ui.svg'
            alt='features background'
            loading='lazy'
            width={365}
            height={386}
            className='w-[42vw] sm:w-[44vw] md:w-[40vw] lg:w-74 xl:w-91'
          />
        </PulsatingBorder>
      </Motion.span>
    </div>
  );
};

const TaxManagementSlideContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className='relative w-full h-auto aspect-628/420 bg-[#DAE5CE] rounded overflow-hidden after:content-[""] after:z-0 after:absolute after:inset-x-0 after:bottom-0 after:h-2/3 after:bg-linear-to-t after:from-[#DAE5CE] after:to-transparent after:pointer-events-none'
    >
      <div className='pt-6 md:pt-8 lg:pt-11 pl-6 md:pl-8 lg:pl-15'>
        <Motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.375, ease: "circInOut", delay: 0.125 }}
        >
          <Image
            className='select-none'
            src='/assets/features-taxmanagement-ui-top.svg'
            alt='tax management ui text'
            width={380}
            height={21}
          />
        </Motion.span>
        <Motion.div
          className='group opacity-50 mt-4.5 w-200 sm:w-235.75 max-lg:hidden'
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.375, ease: "circInOut", delay: 0.325 }}
        >
          <Image
            className='select-none'
            src='/assets/features-taxmanagement-ui-table-header.svg'
            alt='tax management ui table header'
            width={943}
            height={32}
          />
          <div className='w-200 sm:w-235.75 h-168.5 overflow-hidden'>
            <Motion.img
              initial={{ y: 0 }}
              animate={{ y: -358 }}
              transition={{
                ease: "linear",
                duration: 12,
              }}
              src='/assets/features-taxmanagement-ui-table-rows.svg'
              alt='tax management ui table body'
              className='select-none relative'
              width={943}
              height={674}
            />
          </div>
        </Motion.div>
        <Motion.div
          className='group opacity-50 mt-4.5 w-md sm:w-120 md:w-130 lg:hidden'
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 0.5, y: 0 } : { opacity: 0, y: 15 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.375, ease: "circInOut", delay: 0.325 }}
        >
          <Image
            className='select-none'
            src='/assets/features-taxmanagement-ui-table-mobile.svg'
            alt='tax management ui table header'
            width={627}
            height={420}
          />
        </Motion.div>
      </div>
      <Motion.div
        className='absolute z-10 bottom-0 left-0 w-full lg:pb-8 pb-5 px-6 lg:px-11'
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.375, ease: "circInOut", delay: 0.575 }}
      >
        <PulsatingBorder
          borderRadius='8px'
          className='self-center justify-self-center'
        >
          <Image
            src='/assets/features-taxmanagement-ui-bottom.svg'
            alt='features background'
            loading='lazy'
            width={543}
            height={60}
          />
        </PulsatingBorder>
      </Motion.div>
    </div>
  );
};

const RiskChecksSlideContent = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className='relative w-full h-auto aspect-628/420 bg-[#C7DBFF] bg-[url(/assets/features-bg-02.avif)] bg-cover rounded overflow-hidden'
    >
      <Motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.375, ease: "circInOut", delay: 0.615 }}
        className='absolute inset-0 z-10 flex items-center justify-center p-15 md:p-20'
      >
        <PulsatingBorder borderRadius='6px'>
          <Image
            src='/assets/features-riskcheck-ui.svg'
            alt='features background'
            loading='eager'
            width={355}
            height={313}
          />
        </PulsatingBorder>
      </Motion.div>
    </div>
  );
};

interface FeaturesCardProps extends Omit<
  React.ComponentPropsWithoutRef<"div">,
  "content"
> {
  header: string;
  description: string;
  url: string;
  content: React.ReactNode;
}

const FeaturesCard = ({
  className,
  header,
  description,
  url,
  content,
  ...props
}: FeaturesCardProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 max-[1384px]:flex-[0_0_41.125vw] min-[1384px]:flex-[0_0_628px] max-md:flex-[0_0_76.666%] h-auto overflow-hidden",
        className,
      )}
      {...props}
    >
      <h3 className='text-bodylg text-left font-medium text-dark-950 selection:bg-transparent selection:text-dark-950'>
        {header}
      </h3>
      {content}
      <p className='text-bodymd text-balance text-dark-800 sm:mt-2 mt-0 selection:bg-transparent selection:text-dark-950'>
        {description}
      </p>
      <Link
        href={url}
        className='group flex flex-row gap-3 items-center selection:bg-transparent selection:text-dark-950'
      >
        Explore{" "}
        <IconArrowRight className='shrink-0 size-3.5 text-dark-950/80 transition-transform group-hover:translate-x-1' />
      </Link>
    </div>
  );
};

const FeaturesSlider = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false });

  return (
    <div className='w-full'>
      <div className='overflow-visible' ref={emblaRef}>
        <div className='flex gap-5 sm:gap-6 touch-pan-y touch-pinch-zoom'>
          <FeaturesCard
            header='Onboarding'
            description='Sed ipsum orci, lobortis egestas tortor a, molestie condimentum orci. Fusce pretium maximus erat, vitae varius.'
            url='/'
            content={<OnboardingSlideContent />}
          />

          <FeaturesCard
            header='Tax Management'
            description='Sed ipsum orci, lobortis egestas tortor a, molestie condimentum orci. Fusce pretium maximus erat, vitae varius.'
            url='/'
            content={<TaxManagementSlideContent />}
          />

          <FeaturesCard
            header='Risk Checks'
            description='Sed ipsum orci, lobortis egestas tortor a, molestie condimentum orci. Fusce pretium maximus erat, vitae varius.'
            url='/'
            content={<RiskChecksSlideContent />}
          />
        </div>
      </div>
    </div>
  );
};

interface FeaturesProps extends React.ComponentPropsWithoutRef<"section"> {}

const FeaturesSection = ({ className, ...props }: FeaturesProps) => {
  return (
    <section
      className={cn(
        "w-full h-fit text-dark-950 md:px-8 px-5 md:pt-32 pt-12 md:pb-24 pb-10 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className='container relative max-w-7xl mx-auto space-y-10 md:space-y-20'>
        <div className='flex flex-col max-md:max-w-none text-left md:text-left items-start gap-3 md:gap-6 max-w-xl'>
          <h2 className='font-tiempos-headline font-light text-balance text-[clamp(2rem,6.25vw-1rem,3rem)] leading-[1.1] tracking-tight w-full max-w-178 overflow-hidden'>
            Expand your vendor base, without losing compliance
          </h2>
          <p className='text-bodylg text-balance text-dark-800'>
            Nullam mi ligula, varius ornare purus ac, accumsan venenatis leo.
            Aliquam nisl felis, rutrum ac scelerisque sit amet.
          </p>
        </div>
        <FeaturesSlider />
      </div>
    </section>
  );
};

export { FeaturesSection };
