import * as React from "react";
import { cn } from "@/lib/utils";

const cardVariants = {
  default:
    "bg-white rounded-[16px] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-200",
  flat: "bg-white rounded-[16px] border border-mist",
  bordered: "bg-white rounded-[16px] border-2 border-mist hover:border-emerald/30",
};

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "flat" | "bordered" }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(cardVariants[variant], "transition-shadow duration-200", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardContent };
