
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";
// import { home } from "./scrapfolder-1";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCdeirfpzljlvI46CIKFqisW8sCIZ2BMcI",
    authDomain: "loginregisterapp-55ec1.firebaseapp.com",
    databaseURL: "https://loginregisterapp-55ec1-default-rtdb.firebaseio.com",
    projectId: "loginregisterapp-55ec1",
    storageBucket: "loginregisterapp-55ec1.appspot.com",
    messagingSenderId: "721602449115",
    appId: "1:721602449115:web:e3291c4343e3a9643046fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

signup.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var username = document.getElementById('username').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 

            const user = userCredential.user;
            set(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                password: password
            })
            window.location.href = "home.html";
            alert('Account created!');
            
        })

        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorCode, errorMessage);
        });




});

login.addEventListener('click', (e) => {

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            const date = new Date();
            update(ref(database, 'users/' + user.uid), {
                username: username,
                email: email,
                password: password,
                last_login: date

            })
            window.location.href = "home.html";
            alert("Logged in");


        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorCode, errorMessage);
        });
});


const user = auth.currentUser();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of availabl+e properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});



logout.addEventListener('submit', (e) => {
    signOut(auth).then(() => {
        // auth.signOut();
        window.location.href="index.html";
        alert("Logged out");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
    });
});

// function submit(){
//     alert("Hello");
// }
    // document.getElementById("logout").addEventListener('submit',logout);
