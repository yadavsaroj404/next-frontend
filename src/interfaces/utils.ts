export interface ImpactNumber {
  title: string;
  icon: string;
  suffix: string;
  countNumber: number;
  type: string;
  _id: number;
}

export interface UserCategory {
  _id: number;
  title: string;
  title2: string;
  text: string;
  image: string;
}

export interface WhyChooseUsCard {
  title: string;
  description: string;
}

export interface HeroAnimationIcon {
  _id: string;
  name: string;
  alt?: string;
  title: string;
  description: string;
  role: string;
}

export interface Testimonial {
  _id: string;
  tm_detail: string;
  Image: string; // URL to the image
  tm_name: string;
  tm_expertise: string;
  tm_rating: number; // Assuming you'll pass a rating to display stars dynamically
}
