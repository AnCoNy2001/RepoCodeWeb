import { initializeApp } from "firebase/app";
import {
	FacebookAuthProvider,
	getAuth,
	GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASURE_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const providerFb = new FacebookAuthProvider();
export { auth, provider, providerFb };
