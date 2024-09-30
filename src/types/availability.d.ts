// Define the interface for a single day's availability
export interface DayAvailability {
  isAvailable: boolean;
  startTime: string;
  endTime: string;
}

// Define the interface for the entire availability object
export interface Availability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
}
