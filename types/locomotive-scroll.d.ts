declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement
    smooth?: boolean
    multiplier?: number
    class?: string
    scrollbarContainer?: HTMLElement | boolean
    scrollbarClass?: string
    scrollingClass?: string
    draggingClass?: string
    smoothClass?: string
    initClass?: string
    getSpeed?: boolean
    getDirection?: boolean
    scrollFromAnywhere?: boolean
    touchMultiplier?: number
    firefoxMultiplier?: number
    resetNativeScroll?: boolean
    tablet?: {
      smooth?: boolean
      direction?: string
      horizontalGesture?: boolean
      breakpoint?: number
    }
    smartphone?: {
      smooth?: boolean
      direction?: string
      horizontalGesture?: boolean
    }
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions)
    update(): void
    destroy(): void
    start(): void
    stop(): void
    scrollTo(
      target: string | number | HTMLElement,
      options?: {
        offset?: number
        duration?: number
        easing?: number[]
        disableLerp?: boolean
        callback?: () => void
      }
    ): void
    on(event: string, callback: (args: any) => void): void
    off(event: string, callback?: (args: any) => void): void
  }
}