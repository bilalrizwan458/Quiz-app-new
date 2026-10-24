
import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

const signupForm = document.getElementById("signupForm");
const nameInput = document.getElementById("nameOfUser");
const birthDateInput = document.getElementById("birthDate");
const emailInput = document.getElementById("email-User");
const passwordInput = document.getElementById("signupPassword");
const message = document.getElementById("signupMessage");
const signupButton = document.getElementById("signupButton");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const birthDate = birthDateInput.value;
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!name || !birthDate || !email || !password) {
        message.textContent = "Please fill in all fields.";
        message.className = "text-danger";
        return;
    }

    signupButton.disabled = true;
    signupButton.textContent = "Creating account...";
    message.textContent = "";

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await updateProfile(userCredential.user, {
            displayName: name
        });

        await signOut(auth);
        message.textContent = "Account created successfully!";
        message.className = "text-success";

        window.location.href = "./signin.html";

    } catch (error) {
        console.error("Firebase error:", error.code, error.message);

        if (error.code === "auth/email-already-in-use") {
            message.textContent = "This email is already registered. Please sign in.";
        } else if (error.code === "auth/invalid-email") {
            message.textContent = "Please enter a valid email address.";
        } else if (error.code === "auth/weak-password") {
            message.textContent = "Your password is too weak. Use at least 6 characters.";
        } else if (error.code === "auth/operation-not-allowed") {
            message.textContent = "Please enable Email/Password in Firebase Authentication.";
        } else {
            message.textContent = "Sign-up failed. Check the browser console.";
        }

        message.className = "text-danger";

    } finally {
        signupButton.disabled = false;
        signupButton.textContent = "Create Account";
    }
});
