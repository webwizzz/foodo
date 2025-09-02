export function VideoSection() {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        {/* Headline */}
        <h1 className="text-center text-pretty font-matter text-4xl font-semibold leading-tight text-white md:text-5xl">
          Smart, Seamless, AI-Powered Tools
          <br className="hidden md:block" />
          for Modern Restaurants
        </h1>

        {/* Supporting copy */}
        <div className="mt-6 font-matter text-center">
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-neutral-300 md:text-base">
            Discover how Foodo transforms the way restaurants operate.
          </p>
          <p className="mx-auto max-w-3xl text-sm leading-relaxed text-neutral-300 md:text-base">
            Watch how AI, AR, and intuitive systems come together to streamline ordering, enhance guest 
            experience, and optimize every touchpoint—from table to kitchen.
          </p>
        </div>

        {/* Media card */}
        <div className="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-white/10 bg-neutral-900/40 p-2 md:mt-12">
          <div className="relative overflow-hidden rounded-2xl">
            {/* Image: using a random Freepik image as requested */}
            <div className="relative aspect-video w-full">
              <img
                src="/burger.png"
                alt="Delicious sandwich served on a wooden plate in a restaurant setting"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            {/* Center play button */}
            <button
              type="button"
              aria-label="Play video"
              className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400 p-2 shadow-xl ring-8 ring-black/40 transition hover:bg-lime-300"
            >
              {/* Using an SVG to ensure perfect circle and triangle icon */}
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                xmlns="http://www.w3.org/2000/svg"
                className="block"
                aria-hidden="true"
              >
                <circle
                  cx="36"
                  cy="36"
                  r="36"
                  fill="currentColor"
                  className="text-lime-400 group-hover:text-lime-300"
                />
                <path d="M30 24 L50 36 L30 48 Z" fill="#111111" />
              </svg>
              <span className="sr-only">Play</span>
            </button>

            {/* Subtle outline to mimic a polished card */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default VideoSection
