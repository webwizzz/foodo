export default function ContactUs() {
  return (
    <section
      className="relative min-h-screen w-full text-white font-matter md:[background-image:var(--bg-desktop)]"
      aria-label="Hero section with call to action"
      style={{
        '--bg-mobile': "url('/smallcontact.png')",
        '--bg-desktop': "url('/contact.png')",
        backgroundImage: 'var(--bg-mobile)',
        backgroundSize: "cover",
        backgroundPosition: "right center",
        backgroundRepeat: "no-repeat",
      } as React.CSSProperties}
    >
      <div className="mx-auto flex h-full min-h-screen w-full justify-center text-center lg:text-start max-w-7xl items-start">
        <div className="max-w-xl px-6 md:px-12 lg:px-16 pt-24 md:pt-28 lg:pt-40">
          <h1 className="text-pretty  font-matter text-2xl md:text-5xl lg:text-4xl font-semibold leading-tight tracking-[-0.01em]">
            {"Let’s create smarter,"}
            <br />
            {"immersive restaurant"}
            <br />
            {"experiences—together."}
          </h1>

          <p className="mt-6 max-w-md text-sm md:text-base leading-6 text-white/85">
            {"Talk to our team and discover how Foodo can transform your space."}
          </p>

          <div className="mt-6">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-medium text-black shadow-sm hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
