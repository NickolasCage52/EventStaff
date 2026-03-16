"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-12 w-12 text-base",
  lg: "h-16 w-16 text-xl",
  xl: "h-20 w-20 text-2xl",
  "2xl": "h-[120px] w-[120px] text-4xl",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 45%, 45%)`;
}

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  name: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  verified?: boolean;
}

export function Avatar({
  src,
  name,
  size = "md",
  verified = false,
  className,
  ...props
}: AvatarProps) {
  const initials = getInitials(name);
  const bgColor = getColorFromName(name);

  return (
    <div
      className={cn(
        "shrink-0 relative rounded-full flex items-center justify-center font-medium text-white overflow-hidden",
        sizeClasses[size],
        verified && "ring-2 ring-emerald ring-offset-2",
        className
      )}
      style={!src ? { backgroundColor: bgColor } : undefined}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 128px) 128px, 120px"
        />
      ) : (
        initials
      )}
    </div>
  );
}
