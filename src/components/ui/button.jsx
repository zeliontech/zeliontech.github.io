import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Buttons follow the approved design reference: a solid near-black pill for
// primary actions and a white pill with a hairline border for secondary ones.
// The legacy variant names (hero, metal, wallet) are kept so existing pages
// keep working; they now resolve to the same two treatments.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold font-body tracking-[-0.01em] ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:shadow-md",
        hero:
          "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:shadow-md",
        wallet:
          "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:shadow-md",
        accent:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
        outline:
          "border border-border bg-card text-foreground hover:bg-muted hover:border-foreground/20",
        "hero-outline":
          "border border-border bg-card text-foreground hover:bg-muted hover:border-foreground/20",
        metal:
          "border border-border bg-card text-foreground hover:bg-muted hover:border-foreground/20",
        secondary:
          "bg-muted text-foreground hover:bg-muted/70",
        ghost: "hover:bg-muted text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-13 px-7 text-[15px]",
        xl: "h-14 px-9 text-base",
        icon: "h-10 w-10 p-0",
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
