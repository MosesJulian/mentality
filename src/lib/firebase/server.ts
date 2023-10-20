import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import {
  getFirestore,
  type DocumentData,
  type FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentReference,
} from 'firebase-admin/firestore';
import { BOOKINGS_COL, BOOKING_CHATS_COL, EXPERTS_COL, USERS_COL } from './constants';
import type { Booking, BookingChat, Expert, User } from './types';

const serviceAccount = {
  type: 'service_account',
  project_id: 'mentality-a0817',
  private_key_id: import.meta.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: import.meta.env.FIREBASE_PRIVATE_KEY,
  client_email: 'firebase-adminsdk-r834c@mentality-a0817.iam.gserviceaccount.com',
  client_id: '102303589187522695451',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-r834c%40mentality-a0817.iam.gserviceaccount.com',
};

const app = initializeApp({
  credential: cert(serviceAccount as ServiceAccount),
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const converter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
  toFirestore: (data) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as T,
});

const createCollection = <T extends DocumentData>(
  path: string,
  parent: Pick<DocumentReference, 'collection'> = firestore,
) => {
  return parent.collection(path).withConverter(converter<T>());
};

export const collections = {
  users: createCollection<Omit<User, 'id'>>(USERS_COL),
  experts: createCollection<Omit<Expert, 'id'>>(EXPERTS_COL),
  bookings: createCollection<Omit<Booking, 'id'>>(BOOKINGS_COL),
  bookingChats: (bookingId: string) =>
    createCollection<Omit<BookingChat, 'id'>>(
      BOOKING_CHATS_COL,
      collections.bookings.doc(bookingId),
    ),
};

export default app;
