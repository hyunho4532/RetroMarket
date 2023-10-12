import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";

export function firebaseAuthLogin(email, password) {
    const auth = getAuth();

    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user; // 반환된 사용자 정보
        })
        .catch(error => {
            throw error; // 오류 발생 시 예외를 던짐
        });
}

export function firebaseAuthRegister(email, password) {
    const auth = getAuth();

    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            return userCredential.user; // 반환된 사용자 정보
        })
        .catch(error => {
            throw error; // 오류 발생 시 예외를 던짐
        });
}