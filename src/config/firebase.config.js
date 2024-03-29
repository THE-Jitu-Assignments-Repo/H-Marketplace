// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdDvzRCgveDyxYB81cR_X9XBlla-VbasI",
  authDomain: "house-market-9b4de.firebaseapp.com",
  projectId: "house-market-9b4de",
  storageBucket: "house-market-9b4de.appspot.com",
  messagingSenderId: "112523970746",
  appId: "1:112523970746:web:033ee820e06023f8dc1a83"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore()