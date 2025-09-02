"use client"

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pt-10">
      <div className="flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-matter lg:text-4xl font-semibold text-black dark:text-white text-center mb-10">
          Smart,Seamless, <br />
          <span className=" font-semibold leading-none">
            AI-Powered Solutions for<br/> Modern Restaurants
          </span>
        </h1>
        <img
          src={"/shard.png"}
          alt="Sage-green modern restaurant interior with arched doorway and table settings"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover object-center min-h-[28rem] md:min-h-[36rem] lg:min-h-[40rem] w-full max-w-6xl"
          draggable={false}
        />
      </div>
    </div>
  )
}
