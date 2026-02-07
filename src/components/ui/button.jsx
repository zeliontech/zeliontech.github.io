import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium font-heading tracking-wide ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-silver-light via-silver-mid to-silver-dark text-background font-semibold shadow-lg hover:shadow-xl hover:from-silver-light/95 hover:via-silver-mid/95 hover:to-silver-dark/95 transition-all duration-300",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-2 border-border bg-transparent text-foreground hover:bg-muted hover:border-silver-mid/40",
        secondary: "bg-muted border border-border text-foreground hover:bg-muted/80 hover:border-silver-mid/30",
        ghost: "hover:bg-muted/50 hover:text-foreground",
        link: "text-silver-mid underline-offset-4 hover:underline hover:text-silver-light",
        hero: "bg-gradient-to-br from-silver-light via-silver-mid to-silver-dark text-background font-semibold shadow-[0_0_30px_-5px_rgba(226,232,240,0.3)] hover:shadow-[0_0_40px_-5px_rgba(226,232,240,0.4)] hover:from-silver-light/95 hover:via-silver-mid/95 hover:to-silver-dark/95",
        "hero-outline": "border-2 border-silver-mid/40 bg-transparent text-silver-light font-semibold hover:border-silver-light/60 hover:bg-silver-light/5 hover:shadow-[0_0_20px_-8px_rgba(226,232,240,0.2)]",
        metal: "bg-gradient-to-r from-silver-light/8 via-silver-mid/12 to-silver-light/8 border-2 border-silver-mid/25 text-foreground font-semibold hover:border-silver-mid/50 hover:from-silver-light/12 hover:via-silver-mid/18 hover:to-silver-light/12 hover:shadow-[0_0_16px_-6px_rgba(226,232,240,0.15)]",
        wallet: "bg-gradient-to-br from-silver-light via-silver-mid to-silver-dark text-background font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-silver-light/95 hover:via-silver-mid/95 hover:to-silver-dark/95",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
