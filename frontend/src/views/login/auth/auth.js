import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export function firebaseAuthLogin(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
            alert('로그인 완료')
        })
        .catch(error => {
            alert('에러 : ' + error.message)
        });
}