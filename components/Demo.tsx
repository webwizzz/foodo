export function Demo() {
  return (
    <section className="bg-black text-white">
      <div className="mx-auto max-w-8xl px-4 lg:px-16 py-10 md:py-28">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: 3-image grid (top spans 2 cols) */}
          <div className="w-full lg:max-w-2xl">
            <div className="grid grid-cols-2 gap-3 md:gap-3">
              {/* Top wide card */}
              <div className="col-span-2 overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="d1.png"
                  alt="Smiling person wearing a green VR headset"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Bottom-left small card */}
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="d2.png"
                  alt="Minimal green 3D shape above pedestal"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Bottom-right small card */}
              <div className="overflow-hidden rounded-2xl bg-neutral-100">
                <img
                  src="d3.png"
                  alt="Chef holding a plated dish"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Text block */}
          <div className="w-full lg:max-w-xl">
            <h1 className="text-pretty font-semibold leading-tighter text-white text-4xl md:text-[2.6rem]">
              Smart, Seamless,
              <br />
              AI-Driven Systems
              <br />
              for Future-Ready <span className="text-neutral-400">Dining</span>
            </h1>
            <p className="mt-4 text-2xl md:text-4xl font-semibold text-neutral-500">Modern Restaurants</p>

            <div className="mt-8">
              <button
                type="button"
                className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black shadow-sm ring-1 ring-white/10 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-white"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
