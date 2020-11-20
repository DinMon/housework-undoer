import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAwVaaNE_Qw3FBybO9ESpBWNtWEDzyIMU8",
    authDomain: "housework-60d78.firebaseapp.com",
    databaseURL: "https://housework-60d78.firebaseio.com",
    projectId: "housework-60d78",
    storageBucket: "housework-60d78.appspot.com",
    messagingSenderId: "1024398083170",
    appId: "1:1024398083170:web:dd9e1dcdda6bd3bbd47d3b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase