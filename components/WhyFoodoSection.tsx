import { MaskHeading } from "@/components/MaskHeading";
import { MaskText } from "@/components/MaskText";
import { Button } from "@/components/ui/button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WhyFoodoSection() {
  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: "0px 0px -40% 0px" });

  return (
    <section className="flex flex-col md:flex-row lg:flex-row max-w-6xl mx-auto items-center transform -translate-y-20 justify-between min-h-[60vh] ">
      {/* Image on the left with animation */}
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
        className="flex-shrink-0"
      >
        <img
          src="/f3.png"
          alt="Food 3"
          className="w-90 h-90 "
        />
      </motion.div>
      {/* Text on the right */}
      <div className="mt-10 md:mt-0 md:ml-24 flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
        <MaskHeading/>
        <MaskText />
        <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-3 text-lg font-semibold shadow-md mt-8">
          Book a Demo
        </Button>
      </div>
    </section>
  );
}
