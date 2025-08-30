import React from "react";

// Update the path if you move the image to another folder
const bgUrl = "/shard.png"; // Place your image in the public/ folder as shard.png

type Props = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};
export function ShardBackgroundSection({ children, className = "", style = {} }: Props) {
  return (
    <section
      className={`relative w-full h-[650px] flex items-center justify-center ${className}`}
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    >
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
      {/* Optional: overlay for darkening or tint */}
      {/* <div className="absolute inset-0 bg-black/30 z-0" /> */}
    </section>
  );
}

export default ShardBackgroundSection;
