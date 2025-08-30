"use client"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
             Smart,Seamless, <br />
              <span className="text-4xl  font-semibold  leading-none">
AI-Powered Solutions for<br/> Modern Restaurants</span>
            </h1>
          </>
        }
      >
        <img
          src={"/shard.png"}
          alt="Sage-green modern restaurant interior with arched doorway and table settings"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  )
}
