import gsap from "gsap";

export function animateUsedTradeTitle(title) {
    gsap.fromTo(title, { x: 100 }, { x: 0, duration: 1.5 })
}

export function animateUsedTradeFiltering(filtering) {
    gsap.fromTo(filtering, { x: 100, opacity: 0}, { x: 0, duration: 1.5, delay: 3, opacity: 1 });
}