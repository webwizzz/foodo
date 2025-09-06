import { PricingCard } from "./ui/pricing-card"

const BASE_FEATURES = [
  "All in Essentials +",
  "Extended Reality Mixed Reality",
  "Vision Pro Apps",
  "Mobile Apps",
  "Gift Cards",
  "AI Website",
]

const FEATURE_GROUPS = [
  { title: "AI Website", items: ["Regular content update"] },
  { title: "AR Menu", items: ["Custom Models", "Custom Acrylic Stands"] },
  { title: "AI Marketing", items: ["Social listening", "AI derived marketing strategies"] },
  { title: "Social Marketing", items: ["Custom post/week", "Custom video/week"] },
]

export default function Pricing() {
  return (
    <main className="bg-black text-white min-h-screen">
      <section className="mx-auto max-w-7xl px-4 md:px-6 transform -translate-y-30 py-16 md:pb-24 lg:pb-28">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="font-matter text-balance text-4xl md:text-5xl font-semibold">
            Choose the right plan for
            <br className="hidden md:block" /> your Restaurant
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-4">
          <PricingCard 
            title="Enterprise" 
            price="£120/mo" 
            baseFeatures={BASE_FEATURES} 
            groups={FEATURE_GROUPS} 
            customBgColor="#1F1F1F"
          />
          <PricingCard 
            title="Enterprise" 
            price="£120/mo" 
            baseFeatures={BASE_FEATURES} 
            groups={FEATURE_GROUPS} 
            customBgColor="#353535"
          />
          <PricingCard
            title="Enterprise"
            price="£120/mo"
            baseFeatures={BASE_FEATURES}
            groups={FEATURE_GROUPS}
            customBgColor="#ABEF26"
            highlight
          />
        </div>
      </section>
    </main>
  )
}
