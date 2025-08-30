import { motion } from "framer-motion"
import { LogoGrid } from "./LogoGrid"

export default function Clients() {
  return (
    <main className="sticky top-0 min-h-screen w-full flex flex-col items-center justify-center p-6 z-50 bg-black">
      <h2 className="text-2xl md:text-4xl font-semibold text-white mb-16 text-center tracking-tight drop-shadow-lg">
        Trusted Clients
      </h2>
      <motion.section
        className="relative w-full max-w-[1216px] rounded-[22px] overflow-hidden shadow-2xl aspect-[1216/606] safari-aspect-fallback"
        aria-label="Neon logo showcase"
        initial={{ opacity: 0, y: 120 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 60, damping: 18, duration: 0.9 }}
        viewport={{ once: true, amount: 0.4 }}
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
            className="absolute right-[-10%] top-[-35%] h-[500px] w-[500px] rounded-full neon-blur"
            style={{ background: "#ABEF26" }}
          />
          <div
            className="absolute left-[-14%] bottom-[-20%] h-[360px] w-[360px] rounded-full neon-blur"
            style={{ background: "#ABEF26" }}
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
