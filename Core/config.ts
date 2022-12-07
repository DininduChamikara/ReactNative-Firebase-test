import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-aaMs6XH-UqfSE4Kdbk-P2JjxMkcdQcA",
    authDomain: "firstreactnative-504a5.firebaseapp.com",
    projectId: "firstreactnative-504a5",
    storageBucket: "firstreactnative-504a5.appspot.com",
    messagingSenderId: "709556254894",
    appId: "1:709556254894:web:c167bc07e452134a8dd53f",
    measurementId: "G-JCTFW1B6HF"
  };

export const app = initializeApp(firebaseConfig);
// MARK: Firebase Reference
export const db = getFirestore(app);