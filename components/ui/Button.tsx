import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] font-medium cursor-pointer transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald text-white hover:bg-emerald-light shadow-sm hover:shadow-md",
        secondary:
          "border border-emerald text-emerald bg-transparent hover:bg-emerald-muted",
        ghost:
          "text-ink/60 hover:text-ink hover:bg-mist",
        danger:
          "bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/30",
        mocha:
          "bg-mocha text-white hover:bg-mocha-light",
      },
      size: {
        sm: "h-9 min-h-[44px] px-4 text-sm",
        md: "h-11 min-h-[44px] px-6 text-base",
        lg: "h-12 min-h-[44px] px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
