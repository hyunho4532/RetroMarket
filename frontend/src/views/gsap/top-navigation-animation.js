import gsap from "gsap";

export function topNavigationAnimation(topNavigation) {
    gsap.from(topNavigation, { opacity: 0, y: -50, duration: 2 })
}