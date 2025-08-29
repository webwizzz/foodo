import gsap from "gsap"
import { useEffect, useRef } from "react"

export default function AnimatedTextFromGround({ text }: { text: string }) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = textRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.8,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={textRef}
      className="w-full flex flex-col items-center justify-center py-24"
      style={{ minHeight: 180 }}
    >
      {text.split("\n").map((line, i) => (
        <div
          key={i}
          className="text-white text-2xl md:text-4xl font-semibold text-center leading-tight "
          style={{ willChange: "transform, opacity" }}
        >
          {line}
        </div>
      ))}
    </div>
  )
}
