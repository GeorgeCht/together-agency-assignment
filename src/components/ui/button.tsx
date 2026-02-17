import * as React from "react";
import Link from "next/link";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center",
    "overflow-hidden lg:px-5 px-3.5",
    "rounded-sm",
    "font-medium",
    "transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary: "bg-electric-600 hover:bg-electric-700 text-white",
        secondary: "bg-electric-500 hover:bg-electric-400 text-white",
        hollow:
          "bg-transparent border border-white/10 hover:border-white/20 text-white",
      },
      size: {
        sm: "h-11 text-sm",
        md: "h-12 text-[15px]",
        lg: "h-13 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children?: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: "button";
    href?: never;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<
    React.ComponentPropsWithoutRef<typeof Link>,
    keyof ButtonBaseProps | "as"
  > & {
    as: "link";
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    className,
    variant,
    size,
    children,
    as = "button",
    ...restProps
  } = props;

  const classes = cn(buttonVariants({ variant, size }), className);

  if (as === "link") {
    const { href, ...linkProps } = restProps as ButtonAsLink;
    return (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={classes}
      {...(restProps as ButtonAsButton)}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps };
