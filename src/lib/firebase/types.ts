export type User = {
  id: string;
  name: string;
  email: string;
  authProvider: 'google' | 'email';
};

/**
 * YEAR-MONTH-DATE:HOUR, e.g 2021-10-09:19.
 */
export type HourRepresentation = string;

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
  takenHours: HourRepresentation[];
};

export type Booking = {
  id: string;
  userId: string;
  expertId: string;
  details: string;
  hour: HourRepresentation;
  isConfirmed: boolean;
};

export type BookingChat = {
  id: string;
  message: string;
  isSenderUser: boolean;
  sentAt: Date;
};
