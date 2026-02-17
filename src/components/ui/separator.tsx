import React from "react";
import { cn } from "@/lib/utils";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  className?: string;
  dashWidth?: number;
  dashGap?: number;
}

const Separator = React.forwardRef<HTMLHRElement, SeparatorProps>(
  ({ dashWidth = 2, dashGap = 10, className, style, ...props }, ref) => {
    return (
      <hr
        ref={ref}
        style={{
          ["--hr-dash-width" as string]: `${dashWidth}px`,
          ["--hr-dash-gap" as string]: `${dashGap}px`,
          ...style,
        }}
        className={cn(
          "w-full h-px border-none",
          "bg-[repeating-linear-gradient(90deg,var(--color-dark-950)_0,var(--color-dark-950)_var(--hr-dash-width),transparent_var(--hr-dash-width),transparent_calc(var(--hr-dash-width)+var(--hr-dash-gap)))]",
          "in-[.dark]:bg-[repeating-linear-gradient(90deg,var(--color-white)_0,var(--color-white)_var(--hr-dash-width),transparent_var(--hr-dash-width),transparent_calc(var(--hr-dash-width)+var(--hr-dash-gap)))]",
          className,
        )}
        {...props}
      />
    );
  },
);

Separator.displayName = "Separator";

export { Separator };
