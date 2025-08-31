import { cn } from "@/lib/utils"
import { BadgeStamp } from "./ui/BadgeStamp"

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden bg-black text-white",
        "pt-16 md:pt-20 pb-8 md:pb-10",
        "min-h-screen",
        className,
      )}
      aria-labelledby="footer-heading"
    >
      {/* Background image: Desktop - 209-2 */}
      <img
        src="/footerbg.png"
        alt="Brand watermark background"
        className="pointer-events-none absolute inset-1 h-full w-full object-cover object-bottom opacity-100"
      />
      {/* Simple dark overlay to ensure contrast */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Content */}
      <div className=" absolute flex flex-col justify-between mx-auto w-full h-screen max-w-6xl px-6 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
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
        <div className="mt-24 flex flex-col items-start justify-between gap-4 md:flex-row">
          <ul className="flex flex-wrap items-center gap-6 text-xs text-white">
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

      {/* Lime badge in the top-right */}
      <BadgeStamp className="pointer-events-none absolute right-20 top-10 h-24 w-24 md:h-36 md:w-36" />
    </footer>
  )
}
