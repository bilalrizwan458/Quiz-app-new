
import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const signinForm = document.getElementById("signinForm");
const emailInput = document.getElementById("signinEmail");
const passwordInput = document.getElementById("signinPassword");
const message = document.getElementById("signinMessage");
const signinButton = document.getElementById("signinButton");

signinForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    signinButton.disabled = true;
    signinButton.textContent = "Signing in...";
    message.textContent = "";

    try {
        await signInWithEmailAndPassword(auth, email, password);

        message.textContent = "Login successful!";
        message.className = "text-success";

        window.location.href = "./index.html";

    } catch (error) {
        console.error("Sign-in error:", error);

        const errors = {
            "auth/invalid-email":
                "Please enter a valid email address.",
            "auth/invalid-credential":
                "Incorrect email or password. Please try again.",
            "auth/user-not-found":
                "No account was found. Please sign up first.",
            "auth/wrong-password":
                "Incorrect email or password.",
            "auth/too-many-requests":
                "Too many attempts. Please try again later.",
            "auth/operation-not-allowed":
                "Enable Email/Password in Firebase Authentication.",
            "auth/network-request-failed":
                "Could not connect to Firebase. Check your internet connection."
        };

        message.textContent =
            errors[error.code] || "Login failed. Please try again.";
        message.className = "text-danger";

    } finally {
        signinButton.disabled = false;
        signinButton.textContent = "LOGIN";
    }
});
