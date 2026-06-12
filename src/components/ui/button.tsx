"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-btn font-ui text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-deep focus-visible:outline-offset-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-teal text-paper hover:bg-teal-deep shadow-[var(--shadow-sm)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-sand bg-transparent text-teal hover:bg-sand/30 hover:text-teal-deep",
        secondary: "bg-teal text-paper hover:bg-teal-deep",
        ghost: "text-teal hover:bg-sand/30 hover:text-teal-deep",
        link: "text-teal underline-offset-4 hover:underline",
        // Premium variants for the landing page
        hero: "bg-clay text-paper hover:bg-clay/90 shadow-[var(--shadow-sm)] text-base font-semibold",
        "hero-outline": "bg-teal text-paper hover:bg-teal-deep text-base font-medium",
        subtle: "bg-accent text-accent-foreground hover:bg-accent/80",
        // Secondary blue variant
        "secondary-blue": "bg-teal text-paper hover:bg-teal-deep shadow-[var(--shadow-sm)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4",
        lg: "h-12 px-8",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
