import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDNBDFDesX8fE4CAuItH2Uy07DIX1YTpXc",
    authDomain: "teachingcsclassroom.firebaseapp.com",
    projectId: "teachingcsclassroom",
    storageBucket: "teachingcsclassroom.appspot.com",
    messagingSenderId: "658238511656",
    appId: "1:658238511656:web:d19a057bd725f6ed89b31d",
    measurementId: "G-J289M9CZ1Q"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
