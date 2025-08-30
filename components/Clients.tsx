import { motion } from "framer-motion"
import AnimatedTextFromGround from "./AnimatedTextFromGround"
import { LogoGrid } from "./LogoGrid"

export default function Clients() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-6">
      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-16 text-center tracking-tight drop-shadow-lg">
        Trusted Clients
      </h2>
      <motion.section
        className="relative w-full max-w-[1216px] rounded-[22px] overflow-hidden shadow-2xl"
  // style prop moved below to avoid duplicate
        aria-label="Neon logo showcase"
        initial={{ opacity: 0, y: 120, scale: 0.96, boxShadow: '0 32px 64px 0 rgba(0,0,0,0.25)' }}
        whileInView={{ opacity: 1, y: 0, scale: 1, boxShadow: '0 16px 48px 0 rgba(0,0,0,0.32)' }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, duration: 0.9 }}
        viewport={{ once: true, amount: 0.4 }}
  style={{ aspectRatio: "1216 / 606", boxShadow: '0 16px 48px 0 rgba(0,0,0,0.32)' }}
      >
        <img
          src="/neon-bg.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Move overlay behind glows via z-index */}
        <div className="absolute inset-0 bg-black/65 z-[1]" aria-hidden="true" />

        {/* Add two neon circles behind the SVG logos */}
        <div className="pointer-events-none absolute inset-0 z-[2]" aria-hidden="true">
          <div
            className="absolute right-[-10%] top-[-35%] h-[500px] w-[500px] rounded-full blur-xl"
            style={{
              background:"#ABEF26",
              filter: "blur(200px)",
            }}
          />
          <div
            className="absolute left-[-14%] bottom-[-20%] h-[360px] w-[360px] rounded-full blur-xl"
            style={{
              background:"#ABEF26",
              filter: "blur(200px)",
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <div className="w-[92%]">
            <LogoGrid />
          </div>
        </div>
  </motion.section>
    </main>
  )
}
