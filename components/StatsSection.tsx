import { fadeInUp, scaleIn, staggerContainer, useScrollAnimation } from "@/hooks/useScrollAnimation"
import { motion } from "framer-motion"
import { AnimatedNumber } from "./AnimatedNumber"

type Stat = {
  value: number
  label: string
  suffix?: string
  decimals?: number
  abbr?: "none" | "short"
}

const STATS: Stat[] = [
  { value: 50, label: "Clients", suffix: "+", abbr: "none" },
  { value: 100, label: "Restaurants Served", suffix: "+", abbr: "none" },
  { value: 72_000_000, label: "Menu Views per Year", suffix: "+", abbr: "short", decimals: 0 },
  { value: 1_200_000, label: "Guest Ratings Collected", suffix: "+", abbr: "short", decimals: 1 },
]

export default function StatsSection() {
  const { ref, controls } = useScrollAnimation()

  return (
    <motion.section 
      className="w-full bg-black"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div 
          className="rounded-[20px] bg-[#B9F22C] p-6 md:p-10 ring-1 ring-black/20" 
          aria-label="Key metrics"
          variants={scaleIn}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div 
            className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-8"
            variants={staggerContainer}
          >
            {STATS.map((s, index) => (
              <motion.div 
                key={s.label} 
                className="text-black"
                variants={fadeInUp}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: 0.4 + (index * 0.1) 
                }}
              >
                <div className="font-sans text-6xl md:text-7xl font-semibold leading-none tracking-tight">
                  <AnimatedNumber
                    value={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals ?? 0}
                    abbr={s.abbr ?? "none"}
                  />
                </div>
                <p className="mt-4 md:mt-4 font-sans text-xl md:text-xl  font-semibold text-black">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
