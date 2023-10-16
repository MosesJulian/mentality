import { FirebaseOptions, initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { CollectionReference, DocumentData, collection, getFirestore } from 'firebase/firestore';
import { USERS_COL } from './constants';
import { User } from './types';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDz9XwIuBOMMXoic5LiKxRKbZW3FAtjRrk',
  authDomain: 'mentality-a0817.firebaseapp.com',
  projectId: 'mentality-a0817',
  storageBucket: 'mentality-a0817.appspot.com',
  messagingSenderId: '579464014172',
  appId: '1:579464014172:web:98e66acc7de98c1157b999',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const firestore = getFirestore(app);

const createCollection = <T = DocumentData>(path: string, ...pathSegments: string[]) => {
  return collection(firestore, path, ...pathSegments) as CollectionReference<T>;
};

export const collections = {
  users: createCollection<Omit<User, 'id'>>(USERS_COL),
};

export default app;