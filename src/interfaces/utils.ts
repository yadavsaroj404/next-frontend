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
