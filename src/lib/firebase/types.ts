export type User = {
  id: string;
  name: string;
  email: string;
  authProvider: 'google' | 'email';
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
};

export type Expert = {
  id: string;
  fullName: string;
  biography: string;
  academicBackground: string[];
  clinicalSpeciality: string;
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
  expertId: string;
  details: string;
  hour: BookingHour;
  status: 'confirmed' | 'cancelled' | 'pending';
};

export type BookingChat = {
  id: string;
  bookingId: string;
  message: string;
  isSenderUser: boolean;
  sentAt: Date;
};

/**
 * YEAR-MONTH-DATE:HOUR, e.g 2021-10-09:19.
 */
export type BookingHour = string;
