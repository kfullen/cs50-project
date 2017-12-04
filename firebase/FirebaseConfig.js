import * as firebase from 'firebase';
import { 
  FBASE_API_KEY,
  FBASE_AUTH_DOMAIN,
  FBASE_DB_URL,
  FBASE_STORAGE_BUCKET,
} from 'react-native-dotenv';

// Initialize Firebase
const firebaseConfig = {
	apiKey: FBASE_API_KEY,
	authDomain: FBASE_AUTH_DOMAIN,
	databaseURL: FBASE_DB_URL,
	storageBucket: FBASE_STORAGE_BUCKET,
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
