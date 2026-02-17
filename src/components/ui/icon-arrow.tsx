import React from "react";

import { cn } from "@/lib/utils";

interface IconArrowProps extends React.ComponentPropsWithoutRef<"svg"> {}

const IconArrowBase = React.forwardRef<SVGSVGElement, IconArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width='22'
        height='26'
        className={cn("size-5 text-dark-950", className)}
        viewBox='0 0 22 26'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <title>arrow icon</title>
        <path
          d='M21.48 14.32L19.96 12.8L11.88 20.88V5.72205e-06H9.64V20.88L1.56 12.76L0 14.28L10.76 25.04L21.48 14.32Z'
          fill='currentColor'
        />
      </svg>
    );
  },
);

IconArrowBase.displayName = "IconArrowBase";

const IconArrowDown = React.forwardRef<SVGSVGElement, IconArrowProps>(
  (props, ref) => <IconArrowBase ref={ref} {...props} />,
);

IconArrowDown.displayName = "IconArrowDown";

const IconArrowUp = React.forwardRef<SVGSVGElement, IconArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <IconArrowBase
        ref={ref}
        className={cn("rotate-180", className)}
        {...props}
      />
    );
  },
);

IconArrowUp.displayName = "IconArrowUp";

const IconArrowRight = React.forwardRef<SVGSVGElement, IconArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <IconArrowBase
        ref={ref}
        className={cn("-rotate-90", className)}
        {...props}
      />
    );
  },
);

IconArrowRight.displayName = "IconArrowRight";

const IconArrowLeft = React.forwardRef<SVGSVGElement, IconArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <IconArrowBase
        ref={ref}
        className={cn("rotate-270", className)}
        {...props}
      />
    );
  },
);

IconArrowLeft.displayName = "IconArrowLeft";

export { IconArrowDown, IconArrowUp, IconArrowRight, IconArrowLeft };
