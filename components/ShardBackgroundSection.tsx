"use client"

export default function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pt-20 pb-2">
      <div className="flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-matter lg:text-4xl font-semibold text-black dark:text-white text-center mb-10">
          Smart,Seamless, <br />
          <span className=" font-semibold leading-none">
            AI-Powered Solutions for<br/> Modern Restaurants
          </span>
        </h1>
        <div className="relative mx-auto rounded-xl object-cover object-center min-h-[28rem] md:min-h-[36rem] lg:min-h-[40rem] w-full max-w-[73rem]">
          {/* Background image */}
          <img
            src={"/shard.png"}
            alt="Sage-green modern restaurant interior with arched doorway and table settings"
            height={720}
            width={1400}
            className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
            draggable={false}
          />
          
          {/* Content overlay */}
          <div className="relative z-20 h-full">
            {/* Left side text content */}
            <div className="absolute top-8 left-8 md:left-12 lg:left-10 max-w-lg z-30">
              <div className="mb-4">
                <span className="inline-block  py-1 text-sm font-medium text-white rounded-full">
                  AI Website
                </span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-white mb-4 font-matter leading-tight">
                Fast, smart websites that<br />
                let your guests explore, order, and book
              </h2>
              <button className="px-4 py-2 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-100 tracking-tighter transition-colors">
                Book a Demo
              </button>
            </div>
          </div>
          
          {/* Center bottom overlay image - positioned relative to main container */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30">
            {/* Blurred background behind the overlay image */}
            <div className="absolute bg-white/10 backdrop-blur-md rounded-lg -z-10"></div>
            <img
              src={"/frontimg.svg"}
              alt="AI Website interface preview"
              className="w-full md:w-full lg:w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
