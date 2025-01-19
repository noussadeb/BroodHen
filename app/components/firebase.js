// استيراد Firebase SDK
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // إضافة Firestore
import { getStorage } from 'firebase/storage'; // إضافة استيراد Storage

// تكوين Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCB29pd_2aSPFFMdukukht5cYo-47vVX2M", // استبدل بالقيم الخاصة بمشروعك
  authDomain: "broodhen-64736.firebaseapp.com",
  projectId: "broodhen-64736",
  storageBucket: "broodhen-64736.appspot.com",
  messagingSenderId: "702592745444",
  appId: "1:702592745444:web:bf39f0c3d11b7fe1dc91f1"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// إعداد Authentication
const auth = getAuth(app);

// إعداد Firestore
const db = getFirestore(app); // إضافة Firestore

// إعداد Storage
const storage = getStorage(app); // إضافة Storage

// دالة لتسجيل الدخول
export const loginWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential; // يرجع بيانات المستخدم إذا تم تسجيل الدخول بنجاح
  } catch (error) {
    throw error; // رمي الخطأ إذا فشل تسجيل الدخول
  }
};

// تصدير auth و db و storage
export { auth, db, storage }; // تصدير storage مع auth و db
