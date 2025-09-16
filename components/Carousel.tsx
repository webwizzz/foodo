
import type { Item } from "./HorizontalCarousel"
import HorizontalCarousel from "./HorizontalCarousel"

export default function Carousel() {
  const items: Item[] = [
    {
      id: "vr-burger",
      label: "Immersive Experience",
      title: "Immersive dining with vision pro",
      image: "/c1.png",
      emphasis: "light",
    },
    {
      id: "feedback",
      label: "Immersive Experience",
      title: "Smart Feedback Collection",
      image: "/c2.png",
      emphasis: "dark",
    },
    {
      id: "kitchen-display",
      label: "Immersive Experience",
      title: "Kitchen Display Systems",
      image: "/c3.png",
      emphasis: "dark",
    },
    {
      id: "pos-terminal",
      label: "Immersive Experience",
      title: "Front-of-house POS",
      image: "/c4.png",
      emphasis: "light",
    },
    {
      id: "delivery-robot",
      label: "Immersive Experience",
      title: "Autonomous Delivery",
      image: "/c5.png",
      emphasis: "dark",
    },
    {
      id: "tablet-ordering",
      label: "Immersive Experience",
      title: "Self-serve Kiosks",
      image: "/images/tablet-ordering.png",
      emphasis: "light",
    },
    {
      id: "fresh-ingredients",
      label: "Immersive Experience",
      title: "Fresh Sourcing",
      image: "/images/ingredients-fresh.png",
      emphasis: "dark",
    },
  ]

  return (
    <main className="bg-black text-white min-h-1/2 lg:min-h-screen">
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 py-8 md:py-10 lg:py-14">
        <h2 className="text-pretty font-matter text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium tracking-tight px-2 sm:px-0">Get to Know Foodo</h2>

        <div className="mt-4 sm:mt-6 md:mt-8">
          <HorizontalCarousel ariaLabel="Foodo feature cards carousel" items={items} />
        </div>
      </section>
    </main>
  )

}
