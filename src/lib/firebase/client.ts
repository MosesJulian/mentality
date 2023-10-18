import { type FirebaseOptions, initializeApp } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import {
  CollectionReference,
  type DocumentData,
  collection,
  getFirestore,
  type FirestoreDataConverter,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { BOOKINGS_COL, EXPERTS_COL, USERS_COL } from './constants';
import type { Booking, BookingChat, Expert, User } from './types';

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

const converter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
  toFirestore: (data) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const createCollection = <T extends DocumentData>(path: string, ...pathSegments: string[]) => {
  return collection(firestore, path, ...pathSegments).withConverter(converter<T>());
};

export const collections = {
  users: createCollection<Omit<User, 'id'>>(USERS_COL),
  experts: createCollection<Omit<Expert, 'id'>>(EXPERTS_COL),
  bookings: createCollection<Omit<Booking, 'id'>>(BOOKINGS_COL),
  bookingChats: (bookingId: string) =>
    createCollection<Omit<BookingChat, 'id'>>(BOOKINGS_COL, bookingId, 'chats'),
};

export default app;
