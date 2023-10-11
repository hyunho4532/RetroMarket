import gsap from "gsap";

export function animateRegisterTitle(title) {
    gsap.to(title, { y: -50, duration: 1 });
}

export function animateRegisterEmail(email) {
    gsap.fromTo(email, { x: -100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 0.5 });
}

export function animateRegisterPassword(password) {
    gsap.fromTo(password, { x: -100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 1 })
}

export function animateRegisterNickname(nickname) {
    gsap.fromTo(nickname, { x: -100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 1.5 })
}

export function animateRegisterPhoneNumber(phoneNumber) {
    gsap.fromTo(phoneNumber, { x: -100, opacity: 0 }, { x: 0, duration: 1, opacity: 1, delay: 2 })
}

export function animateRegisterButton(registerButton) {
    gsap.fromTo(registerButton, { y: 50, opacity: 0 }, { y: 0, duration: 1, opacity: 1, delay: 2.5 })
}