import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-xs font-medium px-3 py-0.5",
  {
    variants: {
      variant: {
        verified: "bg-emerald/10 text-emerald border border-emerald/20",
        top: "bg-[#B8933A]/10 text-[#B8933A] border border-[#B8933A]/20",
        available: "bg-green-500/10 text-green-700 border border-green-500/20",
        new: "bg-amber-500/10 text-amber-700 border border-amber-500/20",
        pending: "bg-amber-500/10 text-amber-700 border border-amber-500/20",
        urgent: "bg-red-500/10 text-red-700 border border-red-500/20",
        format: "bg-mist text-ink border-0",
        default: "bg-mist text-ink border-0",
      },
      size: {
        sm: "text-xs px-2.5 py-0.5",
        md: "text-xs px-3 py-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
