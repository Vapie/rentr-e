import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js'
import { getDatabase, onValue, ref } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  setPersistence, browserSessionPersistence
} from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js';

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
console.log("import bon ")

const firebaseConfig = {
    apiKey: "AIzaSyC1Qhzu5BG2ZWIEy0_XtN-b-1j057LUfC8",
    authDomain: "leadtechnique2022.firebaseapp.com",
    databaseURL: "https://leadtechnique2022-default-rtdb.firebaseio.com",
    projectId: "leadtechnique2022",
    storageBucket: "leadtechnique2022.appspot.com",
    messagingSenderId: "555327172157",
    appId: "1:555327172157:web:143d2e9ebe0117b8da0454"
    };
    
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  }).catch((error) => {


    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
  });

