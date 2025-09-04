import { cn } from "@/lib/utils"
import { BadgeStamp } from "./ui/BadgeStamp"

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-black text-white font-matter",
        "pt-16 md:pt-20 pb-8 md:pb-10",
        className,
      )}
      aria-labelledby="footer-heading"
    >
      {/* Background image: Desktop only */}
      <img
        src="/footerbg.png"
        alt="Brand watermark background"
        className="pointer-events-none absolute inset-1 h-full w-full object-cover object-bottom opacity-100 hidden md:block"
      />
      
      {/* Background image: Mobile only */}
      <img
        src="/foodo.svg"
        alt="Foodo brand background"
        className="pointer-events-none absolute inset-1 h-full w-full object-contain object-bottom pb-36 opacity-100 md:hidden"
      />
      
      {/* Simple dark overlay to ensure contrast */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Content */}
      <div className="relative flex flex-col mx-auto w-full max-w-6xl px-6 md:px-8">
        
        {/* Mobile Layout - Badge and Let's Talk at top */}
        <div className="md:hidden flex flex-col items-center pt-8 mb-8">
          <BadgeStamp className="h-24 w-24 mb-6" />
          <h1 className="text-5xl font-md tracking-tighter font-matter text-white mb-8 text-center relative group cursor-pointer">
            Let's Talk
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2  md:grid-cols-4 md:gap-14 mb-16 md:mb-24">
          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h2 id="footer-heading" className="mb-4 text-md font-medium text-zinc-300">
              Navigation
            </h2>
            <ul className="space-y-3 text-md text-white">
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  Product
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  Resources
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  Venues
                </a>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <div>
            <h3 className="mb-4 text-md font-medium text-zinc-300">Connect</h3>
            <ul className="space-y-3 text-md text-zinc-200">
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white/90">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-md font-medium text-zinc-300">Contact</h3>
            <div className="space-y-3 text-md text-white">
              <p>
                <span className="text-white">UAE :</span> +971521860020
              </p>
              <p>
                <span className="text-white">UK :</span> +44-7425 737 261
              </p>
              <p>
                <a href="mailto:admin@foodo.ai" className="transition-colors hover:text-white/90">
                  admin@foodo.ai
                </a>
              </p>
              <p>London, United Kingdom</p>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col items-start gap-2 md:flex-row pb-8">
          <ul className="flex flex-wrap items-center gap-3 md:gap-6 text-xs text-white">
            <li>
              <a href="#" className="transition-colors hover:text-zinc-200">
                User terms of service
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-zinc-200">
                Cookies policy
              </a>
            </li>
            <li>
              <a href="#" className="transition-colors hover:text-zinc-200">
                Privacy Policy
              </a>
            </li>
          </ul>
          <p className="text-xs text-white">2024 © foodo. All right reserved.</p>
        </div>
      </div>

      {/* Lime badge in the top-right - Desktop only */}
      <BadgeStamp className="pointer-events-none absolute right-20 top-10 h-24 w-24 md:h-36 md:w-36 hidden md:block" />
    </footer>
  )
}
