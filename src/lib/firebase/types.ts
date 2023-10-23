import type { Timestamp } from 'firebase-admin/firestore';

export type User = {
  id: string;
  name: string;
  email: string;
  authProvider: 'google' | 'email';
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  notes?: string;
};

export type Expert = {
  id: string;
  fullName: string;
  biography: string;
  academicBackground: string[];
  clinicalSpecialty: string;
  startYear: number;
  location: string;
  clinicName: string;
  rating: number;
  consulations: number;
  pricePerHour: number;
  availableDaysPerWeek: number[];
  availableHoursPerDay: number[];
  takenHours: BookingHour[];
};

export type Booking = {
  id: string;
  userId: string;
  details: string;
  hour: BookingHour;
  status: 'confirmed' | 'cancelled' | 'pending';
  expertFullName: string;
  expertBiography: string;
  expertClinicName: string;
  expertLocation: string;
  expertPricePerHour: number;
  expertAcademicBackground: string[];
  expertClinicalSpecialty: string;
};

export type BookingChatMessage = {
  id: string;
  bookingId: string;
  body: string;
  isSenderUser: boolean;
  sentAt: Timestamp;
};

/**
 * YEAR-MONTH-DATE:HOUR, e.g 2021-10-09 19.
 */
export type BookingHour = string;
export const BOOKING_HOUR_FORMAT = 'yyyy-MM-dd HH';
