"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { IconArrowRight } from "@/components/ui/icon-arrow";

import { INTEGRATIONS_DATA } from "@/lib/data/static";

interface IntegrationBlockProps extends React.ComponentPropsWithoutRef<"div"> {
  icon: React.ReactNode;
  description: string;
  url: string;
}

const IntegrationBlockItem = ({
  icon,
  description,
  url,
  className,
  ...props
}: IntegrationBlockProps) => {
  return (
    <div
      className={cn(
        "dark flex flex-col items-start gap-6 transition-all max-xs:pt-2",
        className,
      )}
      {...props}
    >
      <div className='h-12 sm:h-16'>{icon}</div>
      <Separator
        dashWidth={2}
        dashGap={5}
        className='opacity-45 mt-1.5 max-xs:hidden'
      />
      <div className='flex flex-1 flex-col h-36 justify-between'>
        <p className='text-base xl:text-bodylg text-white/80 mt-1.5 mb-4 lg:mb-8'>
          {description}
        </p>
        <Link href={url} className='group flex flex-row gap-3 items-center'>
          See integration{" "}
          <IconArrowRight className='shrink-0 size-3.5 text-white/80 transition-transform group-hover:translate-x-1' />
        </Link>
      </div>
      <Separator
        dashWidth={2}
        dashGap={5}
        className='opacity-45 mt-1.5 xs:hidden'
      />
    </div>
  );
};

interface IntegrationsProps extends React.ComponentPropsWithoutRef<"section"> {}

const IntegrationsSection = ({ className, ...props }: IntegrationsProps) => {
  return (
    <section
      className={cn(
        "w-full h-fit bg-dark-950 text-white md:px-8 px-5 md:pt-41 pt-12 md:pb-32 pb-10 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className='container relative max-w-7xl mx-auto space-y-10 md:space-y-20'>
        <h2 className='text-center font-tiempos-headline font-light text-[clamp(2rem,6.25vw-1rem,3rem)] leading-[1.1] tracking-tight w-full max-w-178 mx-auto overflow-hidden'>
          Perfectly synced, <em>every time</em>
          <br />
          <span className='text-white/60 text-balance'>
            Experience a true two-way sync, with 99.8% accuracy
          </span>
        </h2>
        <div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-none gap-x-12 gap-y-6 sm:gap-y-10 lg:auto-cols-fr lg:grid-flow-col'>
          {INTEGRATIONS_DATA.map(({ icon, description, url }, index) => (
            <IntegrationBlockItem
              key={`integration-${index}`}
              icon={icon}
              description={description}
              url={url}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { IntegrationsSection };
