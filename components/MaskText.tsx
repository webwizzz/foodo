import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const phrases = [
  "Elevate customer experiences and boost sales with",
  "AI and AR.Upgrade your dining space with the future",
  "of innovation today.Simplify tasks from ordering to ",
  "inventory management, reducing errors and enhancing ",
  "service speed."
];

export function MaskText() {
  const body = useRef<HTMLDivElement>(null);
  const isInView = useInView(body, { once: true, margin: "-75%" });

  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1], delay: 0.075 * i }
    })
  };

  return (
    <div ref={body} className="tracking-tight overflow-hidden">
      {phrases.map((phrase, index) => (
        <div key={index} className="overflow-hidden">
          <motion.p
            custom={index}
            variants={animation}
            initial="initial"
            animate={isInView ? "enter" : "initial"}
            className="text-xl text-gray-300 font-normal"
          >
            {phrase}
          </motion.p>
        </div>
      ))}
    </div>
  );
}
