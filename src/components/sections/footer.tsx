"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible } from "@/components/ui/collapsible";

import { FOOTER_LINKS_DATA } from "@/lib/data/static";

interface FooterProps extends React.ComponentPropsWithoutRef<"footer"> {}

const FooterSection = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      className={cn(
        "relative w-full h-fit bg-dark-950 text-white py-8 sm:py-14 md:px-8 px-5 lg:pb-20 lg:pt-32 overflow-hidden",
        className,
      )}
      {...props}
    >
      <div className='container max-w-7xl mx-auto relative z-10 space-y-10 sm:space-y-24 lg:space-y-32'>
        <div className='flex w-full flex-col items-start text-left max-w-xl space-y-5 md:space-y-8'>
          <h2 className='font-tiempos-headline font-light text-[clamp(2.25rem,7.8125vw-1.5rem,3.5rem)] leading-[1.1]'>
            A smarter <em>way to scale</em> accounts payable
          </h2>
          <Button
            size='sm'
            as='link'
            href='/'
            variant='secondary'
            className='w-full sm:w-auto'
          >
            Request a demo
          </Button>
        </div>
        <div className='grid gap-x-6 gap-y-3.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none lg:gap-10 xl:gap-16'>
          {FOOTER_LINKS_DATA.map(({ rows }, index) => (
            <div
              key={index}
              className='dark max-xs:hidden space-y-8 pt-3.5 sm:pt-6 lg:space-y-12 lg:pt-8'
            >
              <Separator className='mb-8' dashWidth={2} dashGap={4} />
              {rows.map(({ title, items }, index) => (
                <div
                  key={`${title}-${index}`}
                  className='space-y-3 sm:space-y-4'
                >
                  <h3 className='flex w-full items-center justify-between text-bodymd font-medium text-white mb-6'>
                    {title}
                  </h3>
                  <ul className='max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-5 max-sm:gap-y-3 sm:[&:has(a:hover)_a]:opacity-65'>
                    {items.map(({ title, href }, index) => (
                      <li
                        key={`${title}-${index}`}
                        className='flex w-full items-center justify-between text-[15px] leading-[1.333]'
                      >
                        <Link
                          href={href}
                          className='flex items-center gap-2 sm:pb-3 lg:pb-4 transition-opacity duration-200 md:hover:opacity-100!'
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
          <Collapsible.Root className='xs:hidden'>
            {FOOTER_LINKS_DATA.flatMap(({ rows }) =>
              rows.map(({ title, items }, index) => (
                <Collapsible.Item key={`${title}-${index}`} title={title}>
                  <ul className='space-y-3 pb-1'>
                    {items.map(({ title, href }, index) => (
                      <li key={`${title}-${index}`}>
                        <Link
                          href={href}
                          className='text-[15px] leading-[1.333] text-white'
                        >
                          {title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Collapsible.Item>
              )),
            )}
          </Collapsible.Root>
        </div>
      </div>

      <div className='absolute inset-0 h-full w-full z-1 mx-auto lg:max-w-480 overflow-hidden'>
        <Image
          src='/assets/texture.avif'
          alt='footer background'
          loading='lazy'
          width={1920}
          height={1080}
          className='absolute inset-0 z-0 h-full w-full object-cover object-center max-xs:max-h-156'
        />
        <div
          className='absolute inset-0 h-full w-full max-xs:max-h-156'
          style={{
            background: `
              radial-gradient(
                ellipse clamp(768px,50vw,860px) 50% at 60% 15%,
                rgba(2, 23, 32, 0) 0%,
                rgba(2, 23, 32, 0.05) 20%,
                rgba(2, 23, 32, 0.99) 55%
              ),
              linear-gradient(
                to bottom,
                rgba(2, 23, 32, 0.33) -25%,
                rgba(2, 23, 32, 0.99) 60%
              )
            `,
          }}
        />
      </div>
    </footer>
  );
};

export { FooterSection };
