"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { IconArrowUp, IconArrowDown } from "@/components/ui/icon-arrow";

const TestimonialGridCardLogo = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href='/'
      className={cn(
        "group col-span-3 max-xs:col-span-6 px-4 md:px-6 flex items-center justify-center overflow-hidden rounded border border-dark-950/20 hover:border-dark-950/25 transition-all max-md:aspect-square lg:aspect-square",
        className,
      )}
    >
      {children}
    </Link>
  );
};

const TestimonialGridCardImage = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "bg-[url(/assets/testimonials.avif)] bg-cover bg-center col-span-3 max-xs:col-span-6 flex items-center justify-center overflow-hidden rounded max-sm:aspect-square lg:aspect-square",
        className,
      )}
    />
  );
};

const TestimonialsBentoGrid = () => {
  return (
    <div className='grid gap-y-5 md:gap-y-6'>
      <div className='grid grid-cols-6 gap-5 md:grid-cols-12 md:gap-6'>
        <TestimonialGridCardLogo>
          <Image
            className='group-hover:opacity-75 opacity-100 transition-opacity'
            src='/assets/logo-prompt-dark.svg'
            alt='ticketmaster logo'
            width={109}
            height={30}
          />
        </TestimonialGridCardLogo>
        <TestimonialGridCardImage />
        <div className='col-span-6 flex flex-col justify-between rounded bg-dark-950 px-6 py-5 text-white lg:px-7 lg:py-6 max-xs:aspect-square'>
          <blockquote className='font-tiempos-headline font-light text-[clamp(1.25rem,1.333vw+0.25rem,1.333rem)] leading-[1.2] tracking-none mb-5 max-w-md lg:mb-6'>
            Nullam mi lingula, varius ornare purus ac, accumsan venenatis leo.
            Aliquam nisl felis, rutrum ac scelerisque sit amet, porttitor sit
            amet erat. Vivamus ut congue metus.
          </blockquote>
          <div className='flex flex-col'>
            <span className='text-bodymd'>Matt Tait</span>
            <span className='text-sm text-white/70'>CEO @ REST</span>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-6 gap-5 md:grid-cols-12 md:gap-6'>
        <TestimonialGridCardLogo>
          <Image
            className='group-hover:opacity-75 opacity-100 transition-opacity'
            src='/assets/logo-remax-dark.svg'
            alt='ticketmaster logo'
            width={111}
            height={20}
          />
        </TestimonialGridCardLogo>
        <div className='col-span-6 flex flex-col justify-between rounded bg-dark-950 px-6 py-5 text-white lg:px-7 lg:py-6 max-xs:aspect-square'>
          <blockquote className='font-tiempos-headline font-light text-[clamp(1.25rem,1.333vw+0.25rem,1.333rem)] leading-[1.2] tracking-none mb-5 max-w-md lg:mb-6'>
            Nullam mi lingula, varius ornare purus ac, accumsan venenatis leo.
            Aliquam nisl felis, rutrum ac scelerisque sit amet, porttitor sit
            amet erat.
          </blockquote>
          <div className='flex flex-col'>
            <span className='text-bodymd'>David McKay</span>
            <span className='text-sm text-white/70'>Co-founder @ OBVS</span>
          </div>
        </div>
        <TestimonialGridCardLogo className='order-first md:order-last'>
          <Image
            className='group-hover:opacity-75 opacity-100 transition-opacity'
            src='/assets/logo-ticketmaster-dark.svg'
            alt='ticketmaster logo'
            width={167}
            height={24}
          />
        </TestimonialGridCardLogo>
      </div>
    </div>
  );
};

interface StatItemProps {
  value: string;
  label: string;
  icon: "up" | "down";
  delay: number;
}

const TestimonialsNumbers = () => {
  const stats = [
    { value: "80%", label: "manual payment tasks", icon: "down", delay: 0.125 },
    { value: "30%", label: "international fees", icon: "down", delay: 0.25 },
    {
      value: "25%",
      label: "payment reconciliation",
      icon: "down",
      delay: 0.375,
    },
    { value: "$100K", label: "saved per year", icon: "up", delay: 0.5 },
  ] as const;

  const StatItem = ({
    stat,
    showDivider,
  }: {
    stat: StatItemProps;
    showDivider: boolean;
  }) => {
    const Icon = stat.icon === "up" ? IconArrowUp : IconArrowDown;

    return (
      <div className='relative flex w-full xs:w-[calc(50%-0.625rem)] md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] gap-8 md:gap-10'>
        {showDivider && (
          <hr
            aria-orientation='vertical'
            style={{
              ["--hr-dash-width" as string]: `2px`,
              ["--hr-dash-gap" as string]: `5px`,
            }}
            className='hidden min-[1168px]:block shrink-0 h-auto w-[1.5px] opacity-30 bg-[repeating-linear-gradient(0deg,var(--color-dark-950)_0,var(--color-dark-950)_var(--hr-dash-width),transparent_var(--hr-dash-width),transparent_calc(var(--hr-dash-width)+var(--hr-dash-gap)))]'
          />
        )}
        <div className='flex flex-col'>
          <div className='flex flex-row items-start gap-2 md:gap-3'>
            <Icon
              className={
                stat.icon === "up"
                  ? "shrink-0 w-5.25 h-6.25 self-end md:mb-5 mb-3 scale-85 sm:scale-100 transition-transform"
                  : "shrink-0 w-5.25 h-6.25 self-start md:mt-5 mt-3 scale-85 sm:scale-100 transition-transform"
              }
            />
            <AnimatedCounter
              delay={stat.delay}
              transitionMode='continuous'
              text={stat.value}
              className='font-tiempos-headline font-light text-[clamp(2.5rem,8vw-1.5rem,3.666rem)] italic tracking-[-0.035em]'
            />
          </div>
          <p className='text-sm xl:text-base 2xl:text-bodylg text-dark-950/80 -mt-2 pl-8'>
            {stat.label}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className='w-full flex flex-col xs:flex-row xs:flex-wrap min-[1096px]:flex-nowrap gap-5 md:gap-6'>
      {stats.map((stat, index) => (
        <StatItem key={stat.label} stat={stat} showDivider={index > 0} />
      ))}
    </div>
  );
};

interface TestimonialsProps extends React.ComponentPropsWithoutRef<"section"> {}

const TestimonialsSection = ({ className, ...props }: TestimonialsProps) => {
  return (
    <section
      className={cn(
        "w-full h-fit text-dark-950 md:px-8 px-5 md:pt-41 pt-12 md:pb-32 pb-10 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className='container relative max-w-7xl mx-auto space-y-10 md:space-y-20'>
        <h2 className='text-center font-tiempos-headline font-light text-balance text-[clamp(2rem,6.25vw-1rem,3rem)] leading-[1.1] tracking-tight w-full max-w-175 mx-auto overflow-hidden'>
          Nullam mi lingula, varius ornare purus ac,{" "}
          <em className='leading-[0.8]'>accumsan venenatis</em> leo.
        </h2>
        <TestimonialsBentoGrid />
        <TestimonialsNumbers />
      </div>
    </section>
  );
};

export { TestimonialsSection };
