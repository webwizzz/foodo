"use client"
import { cn } from "@/lib/utils"

type Props = { className?: string }

/**
 * Lime circular badge with an up-right arrow, inspired by the screenshot.
 * Colors (4 total): black, white, gray (zinc), lime (#B5E03B).
 */
export function BadgeStamp({ className }: Props) {
  return <img src="/badge.svg" alt="" aria-hidden="true" className={cn("select-none", className)} />
}
