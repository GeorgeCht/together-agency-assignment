"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { RotatingText } from "@/components/ui/rotating-text";
import { Button } from "@/components/ui/button";
import { motion as Motion } from "motion/react";

import { CLIENT_LOGOS_DATA } from "@/lib/data/static";

interface HeroSectionProps extends React.ComponentPropsWithoutRef<"section"> {}

const HeroSection = ({ className, ...props }: HeroSectionProps) => {
  return (
    <section
      className={cn(
        "relative w-full bg-dark-950 text-white md:px-8 px-5 md:pt-20 pt-10 md:pb-14 pb-6 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className='container relative z-10 max-w-7xl mx-auto space-y-10 md:space-y-20'>
        <h1 className='max-w-208 min-h-[2em] text-[clamp(2.5rem,14vw-3rem,6rem)] font-tiempos-headline font-light tracking-tight leading-none'>
          <RotatingText
            texts={[
              "Accounts payable automation,",
              "International payments,",
              "Vendor management,",
            ]}
            suffix=' solved'
            mainClassName='overflow-hidden py-0.5 sm:py-1 md:py-2'
            staticWordClassName='tracking-tight leading-[0.8em] opacity-60'
            staggerDuration={0.075}
            transition={{ type: "spring", damping: 40, stiffness: 400 }}
            rotationInterval={3000}
          />
        </h1>

        <div className='flex flex-col justify-between gap-8 sm:gap-10 mt-5 md:mt-8 lg:mt-18 lg:flex-row lg:gap-12'>
          <div className='space-y-5 sm:space-y-6 lg:space-y-10 w-full lg:w-[35%] lg:max-w-103'>
            <p className='md:text-bodylg text-bodymd text-white/70'>
              Nullam mi ligula, varius ornare purus ac, accumsan venenatis leo.
              Aliquam nisl felis, rutrum ac scelerisque sit amet, porttitor sit
              amet erat. Vivamus ut congue metus.
            </p>
            <div className='flex flex-col xs:flex-row xs:gap-4 gap-3'>
              <Button
                size='sm'
                as='link'
                href='/'
                variant='primary'
                className='xs:w-fit w-full'
              >
                Request a demo
              </Button>
              <Button
                size='sm'
                as='link'
                href='/'
                variant='hollow'
                className='xs:w-fit w-full'
              >
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  className='mr-2'
                >
                  <title>Play button icon</title>
                  <path
                    d='M12.9173 8.27723L5.85155 12.9877C5.69837 13.0898 5.49141 13.0484 5.38929 12.8953C5.35279 12.8405 5.33331 12.7762 5.33331 12.7104V3.28939C5.33331 3.10529 5.48255 2.95605 5.66665 2.95605C5.73245 2.95605 5.79679 2.97553 5.85155 3.01203L12.9173 7.7225C13.0704 7.82463 13.1118 8.03163 13.0097 8.18477C12.9853 8.22137 12.9539 8.25283 12.9173 8.27723Z'
                    fill='currentColor'
                  />
                </svg>
                Watch a video
              </Button>
            </div>
          </div>
          <div className='grid flex-1 grid-cols-3 grid-rows-2 w-full lg:w-[65%] lg:max-w-183'>
            {CLIENT_LOGOS_DATA.map(({ title, path, width, height }) => (
              <div
                key={`${title}`}
                className='flex min-h-16 items-center justify-center px-2 border-dashed border-white/20 sm:min-h-21 not-nth-[3n]:border-r nth-[n+4]:border-t'
              >
                <Image src={path} alt={title} width={width} height={height} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
        }}
        className='absolute inset-0 h-full w-full z-1 mx-auto lg:max-w-480 overflow-hidden'
      >
        <Image
          src='/assets/texture.avif'
          alt='hero background'
          loading='eager'
          width={1920}
          height={1080}
          className='absolute inset-0 z-0 h-full w-full object-cover object-center'
        />
        <div
          className='absolute inset-0 h-full w-full'
          style={{
            background: `
              radial-gradient(
                ellipse 1280px 160% at 50% 10%,
                rgba(2, 23, 32, 0) 0%,
                rgba(2, 23, 32, 0.15) 30%,
                rgba(2, 23, 32, 0.99) 50%
              ),
              linear-gradient(
                to bottom,
                rgba(2, 23, 32, 0.33) -15%,
                rgba(2, 23, 32, 0.99) 60%
              )
            `,
          }}
        />
      </Motion.div>
    </section>
  );
};

export { HeroSection };
