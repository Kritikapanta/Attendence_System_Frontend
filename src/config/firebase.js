import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
// Remove analytics if you don't need it, or keep it if you want
// import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxOSqcR7ylzLY0_sl-gTn_0LGrSrW13_U",
  authDomain: "attendancesystem-2c077.firebaseapp.com",
  databaseURL: "https://attendancesystem-2c077-default-rtdb.firebaseio.com",
  projectId: "attendancesystem-2c077",
  storageBucket: "attendancesystem-2c077.firebasestorage.app",
  messagingSenderId: "344285294788",
  appId: "1:344285294788:web:4e5f9906f59130c075d991",
  measurementId: "G-C8KSG5NHB3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);

// Initialize Authentication
const auth = getAuth(app);

// Initialize Analytics (optional - remove if not needed)
// const analytics = getAnalytics(app);

export { database, auth };