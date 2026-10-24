
import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const logoutButton = document.getElementById("logoutButton");
const logoutMessage = document.getElementById("logoutMessage");

onAuthStateChanged(auth, function (user) {
    if (!user) {
        window.location.replace("./signin.html");
    }
});

logoutButton.addEventListener("click", async function () {
    logoutButton.disabled = true;
    logoutMessage.textContent = "";

    try {
        await signOut(auth);
        window.location.replace("./signin.html");
    } catch (error) {
        console.error("Sign-out error:", error);
        logoutMessage.textContent = "Could not log out. Please try again.";
        logoutButton.disabled = false;
    }
});
