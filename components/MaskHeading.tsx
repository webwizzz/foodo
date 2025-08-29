import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const phrases = [
  "Why Foodo ?",

];

export function MaskHeading() {
  const body = useRef<HTMLDivElement>(null);
  const isInView = useInView(body, { once: true, margin: "-65%" });

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: { duration: 0.75, ease: "easeInOut", delay: 0.075 * i }
    })
  };

  return (
    <div ref={body} className="tracking-tight mb-8 overflow-hidden">
      {phrases.map((phrase, index) => (
        <div key={index} className="overflow-hidden">
          <motion.h2
            custom={index}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : "initial"}
            className="text-6xl text-white   font-semibold"
          >
            {phrase}
          </motion.h2>
        </div>
      ))}
    </div>
  );
}
