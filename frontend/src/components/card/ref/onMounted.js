import {onMounted} from "vue";
import { onAuthStateChanged } from "firebase/auth";

export function useAuth(auth, isUserLoggedIn, currentUserUid) {

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            isUserLoggedIn.value = user;
            currentUserUid.value = user ? user.uid : null;
        });
    });

    return {
        isUserLoggedIn,
        currentUserUid
    }
}