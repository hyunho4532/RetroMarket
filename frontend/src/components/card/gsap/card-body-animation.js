import gsap from "gsap";

export function processCardBody(process) {
    gsap.from(process, { opacity: 0, x: 100, duration: 3.5, delay: 1 })
}

export function finishCardBody(finish) {
    gsap.from(finish, { opacity: 0, x: 100, duration: 3.5, delay: 3 })
}

export function progressCardBody(progress) {
    gsap.from(progress, { opacity: 0, x: 100, duration: 3.5, delay: 5 })
}

export function filteringCardBody(filtering) {
    gsap.from(filtering, { opacity: 0, x: 100, duration: 4.5, delay: 5 });
}