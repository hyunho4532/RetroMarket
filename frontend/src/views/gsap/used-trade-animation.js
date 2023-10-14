import gsap from "gsap";

export function animateUsedTradeTitle(title) {
    gsap.fromTo(title, { x: 100 }, { x: 0, duration: 1.5 })
}