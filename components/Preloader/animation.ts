export const opacity = {
    initial: {
        opacity: 0
    },
    enter: {
        opacity: 1,
        transition: {duration: 1, delay: 0.2}
    },
}

export const slideUp = {
    initial: {
        y: 0
    },
    exit: {
        y: "-100vh",
        transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1] as [number, number, number, number], delay: 0.2}
    }
}
