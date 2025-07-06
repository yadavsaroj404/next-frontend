export interface CounsellorInSearchResults {
  degrees: string[];
  avatar: string;
  _id: string;
  commonid: string;
  name: string;
  phone: string;
  slug: string;
  about: string;
  city: string;
  experience: number;
  totalSessions: number;
  availability?: number;
  dayAvailability: Array<{
    available: boolean;
    day: string;
    fullDay: boolean;
    timeSlots: {
      from: number;
      to: number;
    };
  }>;
}
