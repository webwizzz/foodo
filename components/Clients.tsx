import { motion } from "framer-motion"
import { LogoGrid } from "./LogoGrid"

export default function Clients() {
  return (
    <main className="sticky top-0 min-h-1/2 lg:min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-6 z-50 bg-black">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-8 md:mb-12 lg:mb-16 text-center tracking-tight drop-shadow-lg px-4">
        Trusted Clients
      </h2>
      
      {/* Mobile Layout - Simple gradient background */}
      <div className="block md:hidden w-full max-w-sm mx-auto">
        <div className="relative rounded-2xl overflow-hidden p-8" 
             style={{
               background: 'linear-gradient(135deg, #1a1a1a 0%, #2d4a2d 50%, #1a1a1a 100%)'
             }}>
          <LogoGrid />
        </div>
      </div>

      {/* Desktop Layout - Neon effects */}
      <motion.section
        className="hidden md:block relative w-full max-w-[600px] lg:max-w-[800px] xl:max-w-[1216px] rounded-[22px] overflow-hidden shadow-2xl aspect-[1216/606] safari-aspect-fallback"
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
            className="absolute right-[-10%] top-[-35%] h-[400px] w-[400px] lg:h-[500px] lg:w-[500px] rounded-full neon-blur"
            style={{ background: "#ABEF26" }}
          />
          <div
            className="absolute left-[-14%] bottom-[-20%] h-[280px] w-[280px] lg:h-[360px] lg:w-[360px] rounded-full neon-blur"
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
