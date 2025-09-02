import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhyFoodoSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: "0px 0px -40% 0px" });
  const textInView = useInView(textRef, { once: true, margin: "0px 0px -30% 0px" });

  const textPhrases = [
    "Elevate customer experiences and boost sales with",
    "AI and AR. Upgrade your dining space with the future",
    "of innovation today. Simplify tasks from ordering to",
    "inventory management, reducing errors and enhancing",
    "service speed."
  ];

  // Different text divisions for smaller screens
  const mobileTextPhrases = [
    "Elevate customer experiences",
    "and boost sales with AI and AR.",
    "Upgrade your dining space",
    "with the future of innovation today.",
    "Simplify tasks from ordering",
    "to inventory management,",
    "reducing errors and enhancing",
    "service speed."
  ];

  return (
    <section className="flex flex-col md:flex-row lg:flex-row max-w-6xl mx-auto items-start transform -translate-y-20 justify-between min-h-[60vh] ">
      {/* Image on the left with animation - hidden on small screens */}
      <motion.div
        ref={imageRef}
        initial={{ x: -120, opacity: 0 }}
        animate={
          imageInView
            ? {
                x: 0,
                opacity: 1,
                transition: {
                  duration: 1.3,
                  ease: [0.33, 1, 0.68, 1],
                },
              }
            : {}
        }
        className="hidden md:block flex-shrink-0"
      >
        <img
          src="/f3.png"
          alt="Food 3"
          className="w-90 h-90 "
        />
      </motion.div>
      {/* Text content - centered on small screens, left-aligned on larger screens */}
      <div ref={textRef} className="mt-20 md:mt-16 md:ml-24 flex flex-col items-start md:items-start text-start md:text-left max-w-xl font-matter mx-auto md:mx-0">
        {/* Heading Animation */}
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={textInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl text-[#F3F0F0] font-semibold mb-8"
        >
          Why Foodo ?
        </motion.h2>

        {/* Text Paragraphs Animation */}
        <div className="tracking-tight flex flex-col items-start  mb-8">
          {/* Desktop/Large screens text */}
          <div className="hidden md:block">
            {textPhrases.map((phrase, index) => (
              <motion.p 
                key={index} 
                className="text-lg lg:text-xl text-[#C3C3C3] leading-tight font-normal"
                initial={{ y: 30, opacity: 0 }}
                animate={textInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + (index * 0.1),
                  ease: "easeOut"
                }}
              >
                {phrase}
              </motion.p>
            ))}
          </div>

          {/* Mobile/Small screens text */}
          <div className="block md:hidden">
            {mobileTextPhrases.map((phrase, index) => (
              <motion.p 
                key={index} 
                className="text-lg text-gray-300 font-normal"
                initial={{ y: 30, opacity: 0 }}
                animate={textInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.3 + (index * 0.08),
                  ease: "easeOut"
                }}
              >
                {phrase}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={textInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
        >
          <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold shadow-md">
            Book a Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
