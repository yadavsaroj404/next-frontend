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

export interface Counsellor {
  _id: string; // Unique identifier for the counsellor
  slug: string; // Unique identifier for the counsellor's profile page
  avatar: string; // URL for the counsellor's profile picture
  name: string;
  degrees: string[]; // Array of degrees, e.g., ["M.Sc. Psychology", "Ph.D. Career Guidance"]
  reviewsCount: number; // Total number of reviews
  rating: number; // Average rating out of 5
  about: string; // Short description about the counsellor
  city: string;
  experience: number; // Years of experience
  totalSessions: number; // Total counselling sessions conducted
  // availability: string; // e.g., "7" for 7 days a week, or "Mon-Fri"
  instagramUrl?: string; // Optional social media URLs
  facebookUrl?: string;
  linkedinUrl?: string;
}
