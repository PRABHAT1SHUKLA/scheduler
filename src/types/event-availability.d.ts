// Interface for Booking model
export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  name: string;
  email: string;
  additionalInfo?: string;
  startTime: Date;
  endTime: Date;
  meetLink: string;
  googleEventId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for DayAvailability model
export interface DayAvailability {
  id: string;
  availabilityId: string;
  day: Week;
  startTime: Date;
  endTime: Date;
}

// Enum for Weekdays (from your Prisma schema)
export enum Week {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

// Interface for Weeklyavailability model
export interface Weeklyavailability {
  id: string;
  userId: string;
  days: DayAvailability[];
  timeGap: number;
  createdAt: Date;
  updatedAt: Date;
}

// Parameters for generateAvailableTimeSlots function
export interface GenerateTimeSlotsParams {
  startTime: Date;
  endTime: Date;
  duration: number;
  bookings: Booking[];
  dateStr: string;
  timeGap?: number;
}
