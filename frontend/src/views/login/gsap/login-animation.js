import gsap from "gsap";

export function animateLoginTitle(title) {
    gsap.from(title, { y: -50, duration: 1 })
}

export function animateLoginEmail(email) {
    gsap.fromTo(email, { x: 100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 0.5 });
}

export function animateLoginPassword(password) {
    gsap.fromTo(password, {x: 100, opacity: 0}, {x: 0, duration: 1, opacity: 1, delay: 1});
}

export function animateLoginButton(loginButton) {
    gsap.fromTo(loginButton,  {y: 0, opacity: 0, }, { y: 100, duration: 1, opacity: 1, delay: 1.5});
}