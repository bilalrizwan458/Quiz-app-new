
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD65bmI5vuAkwenkeFr9QPOwsjVqnc_Di0",
    authDomain: "quiz-app-dd611.firebaseapp.com",
    projectId: "quiz-app-dd611",
    storageBucket: "quiz-app-dd611.firebasestorage.app",
    messagingSenderId: "193965903619",
    appId: "1:193965903619:web:06ab713ad161a83d042336",
    measurementId: "G-X52R9BJE0K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
