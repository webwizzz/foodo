"use client"
import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"

type Props = { className?: string; durationSec?: number }

export function BadgeStamp({ className, durationSec = 16 }: Props) {
  const reduce = useReducedMotion()

  return (
    <motion.img
      src="/badge.svg"
      alt=""
      aria-hidden="true"
      className={cn("select-none", className)}
      style={{ transformOrigin: "50% 50%" }}
      initial={reduce ? undefined : { rotate: 0 }}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={reduce ? undefined : { duration: durationSec, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
    />
  )
}
