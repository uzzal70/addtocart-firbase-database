import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAq6kgBepG94PaiNE_F9bZmz3rYk9ofUeU',
  authDomain: 'e-commerce-crud-701e4.firebaseapp.com',
  databaseURL: 'https://e-commerce-crud-701e4-default-rtdb.firebaseio.com',
  projectId: 'e-commerce-crud-701e4',
  storageBucket: 'e-commerce-crud-701e4.appspot.com',
  messagingSenderId: '64664724518',
  appId: '1:64664724518:web:8300e68556f874aa35b2e7',
  measurementId: 'G-WWQ9DFJXJP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database

export const database = getFirestore(app);
