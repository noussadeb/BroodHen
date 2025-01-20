
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
import { getStorage } from 'firebase/storage'; 


const firebaseConfig = {
  apiKey: "AIzaSyCB29pd_2aSPFFMdukukht5cYo-47vVX2M", 
  authDomain: "broodhen-64736.firebaseapp.com",
  projectId: "broodhen-64736",
  storageBucket: "broodhen-64736.appspot.com",
  messagingSenderId: "702592745444",
  appId: "1:702592745444:web:bf39f0c3d11b7fe1dc91f1"
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const db = getFirestore(app); 


const storage = getStorage(app);


export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; 
  } catch (error) {
    throw error; 
  }
};


export { auth, db, storage }; 
