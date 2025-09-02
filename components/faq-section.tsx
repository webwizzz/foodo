"use client"

import { cn } from "@/lib/utils"
import { Minus, Plus } from "lucide-react"
import * as React from "react"

type FaqItem = {
  id: string
  question: string
  answer: string
}

const ITEMS: FaqItem[] = [
  {
    id: "q1",
    question: "What Is Foodo?",
    answer:
      "Foodo is a fictional platform used here as dummy content. Imagine a simple tool that helps venues present interactive menus and streamline ordering. This paragraph is placeholder copy to demonstrate the expanded answer style and line length on larger screens.",
  },
  {
    id: "q2",
    question: "How Does The AR Menu Work?",
    answer:
      "Customers scan a QR code, then view an augmented menu overlay with 3D dishes, descriptions, and pricing. This is sample text only; replace with real product details. The experience is designed to be fast, lightweight, and mobile-first.",
  },
  {
    id: "q3",
    question: "What Kind Of Support Does Foodo Offer?",
    answer:
      "We provide email-based support, a quick start guide, and a knowledge base with step-by-step tutorials. For pilots, office hours are available. All of this is dummy content to show how your answers might look.",
  },
  {
    id: "q4",
    question: "Can Foodo Be Integrated With My Existing Systems?",
    answer:
      "Yes—use webhooks and a simple API to sync orders, menu items, and fulfillment status. This placeholder copy illustrates a concise, scannable response. Replace with your integration specifics.",
  },
]

export function FAQSection({ className }: { className?: string }) {
  const [openId, setOpenId] = React.useState<string | null>(ITEMS[0].id)

  const toggle = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id))
  }

  return (
    <section className={cn("w-full bg-black text-white font-matter", className)} aria-labelledby="faq-heading">
      <div className="mx-auto max-w-5xl px-6 md:px-8 py-16 md:py-24">
        <h2
          id="faq-heading"
          className="text-center text-3xl md:text-5xl font-semibold tracking-tight text-white mb-10 md:mb-16"
        >
          FAQ
        </h2>

        <div className="divide-y divide-transparent">
          {ITEMS.map((item) => {
            const isOpen = openId === item.id
            const contentId = `${item.id}-content`
            return (
              <div key={item.id} className="py-6 md:py-10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  onClick={() => toggle(item.id)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="text-xl md:text-2xl font-medium leading-snug">{item.question}</span>
                  <span aria-hidden="true" className="ml-6 shrink-0 text-white">
                    {isOpen ? <Minus className="h-6 w-6 md:h-7 md:w-7" /> : <Plus className="h-6 w-6 md:h-7 md:w-7" />}
                  </span>
                </button>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={item.id}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr] mt-4 md:mt-5" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl text-sm md:text-base leading-relaxed text-neutral-300">{item.answer}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
