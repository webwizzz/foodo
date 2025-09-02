import { cn } from "@/lib/utils"
import { CheckCircle2 } from "lucide-react"
import { useState } from "react"

type FeatureGroup = {
  title: string
  items: string[]
}

type PricingCardProps = {
  title: string
  price: string
  // legacy simple list
  features?: string[]
  // new structured props
  baseFeatures?: string[]
  groups?: FeatureGroup[]
  highlight?: boolean
  customBgColor?: string
}

export function PricingCard({ title, price, features, baseFeatures, groups, highlight, customBgColor }: PricingCardProps) {
  const isHighlight = !!highlight
  const simple = features ?? []
  const base = baseFeatures ?? simple
  const [isPriceVisible, setIsPriceVisible] = useState(false)

  const handleButtonClick = () => {
    if (!isPriceVisible) {
      setIsPriceVisible(true)
    } else {
      // Handle select plan logic here
      console.log(`Selected ${title} plan`)
    }
  }

  // Determine background and text colors
  const getBgStyle = () => {
    if (customBgColor) {
      return { backgroundColor: customBgColor }
    }
    return {}
  }

  const getTextColor = () => {
    if (customBgColor) {
      // Check if it's a light color (like #ABEF26) to determine text color
      const hex = customBgColor.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000
      return brightness > 155 ? 'text-black' : 'text-white'
    }
    return isHighlight ? 'text-black' : 'text-white'
  }

  const textColor = getTextColor()
  const isLightBg = textColor === 'text-black'

  return (
    <section
      className={cn(
        // bigger card, very rounded corners
        "rounded-[28px] p-8 md:p-10 lg:p-12 flex flex-col h-full font-matter",
        customBgColor ? textColor : (isHighlight ? "bg-lime-400 text-black" : "bg-zinc-900 text-white"),
      )}
      style={getBgStyle()}
      role="region"
      aria-label={`${title} plan`}
    >
      {/* Top copy */}
      <div className="text-center">
        <h3 className="font-sans text-2xl md:text-3xl lg:text-3xl font-semibold">{title}</h3>
        <div className="mt-3 relative">
          <p 
            className={cn(
              "font-sans font-bold tracking-tight text-5xl md:text-6xl lg:text-5xl transition-all duration-300",
              !isPriceVisible && "blur-md"
            )}
          >
            {price}
          </p>
          {!isPriceVisible && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-semibold opacity-80">••••</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-7 md:mt-8 flex justify-center">
        <button
          type="button"
          onClick={handleButtonClick}
          className={cn(
            "h-8 md:h-10 w-full px-6 md:px-7 rounded-full text-sm md:text-base font-medium transition-colors",
            customBgColor 
              ? (isLightBg ? "bg-black text-white hover:bg-zinc-800" : "bg-white text-black hover:bg-zinc-200")
              : (isHighlight ? "bg-black text-white hover:bg-zinc-900" : "bg-white text-black hover:bg-zinc-200"),
          )}
          aria-label={isPriceVisible ? `Select ${title} plan` : `View ${title} price`}
        >
          {isPriceVisible ? "Select Plan" : "View Price"}
        </button>
      </div>

      {/* Base features (simple list) */}
      <ul
        className={cn(
          "mt-8 md:mt-10 space-y-5 md:space-y-5 text-base md:text-xl leading-relaxed",
          customBgColor 
            ? (isLightBg ? "text-black/80" : "text-white/80")
            : (isHighlight ? "text-black/80" : "text-white/80"),
        )}
      >
        {base.map((feature, i) => (
          <li key={`base-${i}`} className="pt-1">
            {feature}
          </li>
        ))}
      </ul>

      {/* Grouped sections with check items */}
      {Array.isArray(groups) && groups.length > 0 && (
        <div className="mt-6 md:mt-8 space-y-7 md:space-y-8">
          {groups.map((group, idx) => (
            <div key={group.title + idx}>
              <h4
                className={cn(
                  "font-sans text-base md:text-xl font-semibold mb-3",
                  customBgColor 
                    ? (isLightBg ? "text-black" : "text-white")
                    : (isHighlight ? "text-black" : "text-white"),
                )}
              >
                {group.title}
              </h4>
              <ul className="space-y-3 md:space-y-3.5">
                {group.items.map((item, i) => (
                  <li key={`item-${idx}-${i}`} className="flex items-start gap-3 md:gap-3.5">
                    <CheckCircle2
                      className={cn(
                        "shrink-0 mt-0.5", 
                        customBgColor 
                          ? (isLightBg ? "text-green-600" : "text-lime-400")
                          : (isHighlight ? "text-lime-600" : "text-lime-400")
                      )}
                      size={18}
                      aria-hidden="true"
                    />
                    <span className={cn(
                      customBgColor 
                        ? (isLightBg ? "text-black/80" : "text-white/80")
                        : (isHighlight ? "text-black/80" : "text-white/80")
                    )}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default PricingCard
