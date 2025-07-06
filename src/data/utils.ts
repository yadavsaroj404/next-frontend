import {
  ImpactNumber,
  UserCategory,
  WhyChooseUsCard,
} from "@/interfaces/utils";

export const ImpactNumbers: ImpactNumber[] = [
  {
    title: "Students Received Counselling In India",
    icon: "/assets/images/homepage/Section2_1.svg",
    suffix: "K+",
    countNumber: 2165,
    type: "blue",
    _id: 1,
  },
  {
    title: "Psychometrics Completed",
    icon: "/assets/images/homepage/Section2_2.svg",
    suffix: "K+",
    countNumber: 125,
    type: "white",
    _id: 2,
  },
  {
    title: "Career Counsellors & Experts",
    icon: "/assets/images/homepage/Section2_3.svg",
    suffix: "+",
    countNumber: 4300,
    type: "blue",
    _id: 3,
  },
  {
    title: "Centres Across India",
    icon: "/assets/images/homepage/Section2_4.svg",
    suffix: "+",
    countNumber: 55,
    type: "white",
    _id: 4,
  },
  {
    title: "Schools",
    icon: "/assets/images/homepage/Section2_5.svg",
    suffix: "+",
    countNumber: 750,
    type: "blue",
    _id: 5,
  },
  {
    title: "Universities",
    icon: "/assets/images/homepage/Section2_6.svg",
    suffix: "+",
    countNumber: 2000,
    type: "white",
    _id: 6,
  },
];

export const userCategories: UserCategory[] = [
  {
    _id: 1,
    image: "/assets/images/homepage/Sec2_1.png",
    title: "Career Guidance",
    title2: "for Class 9th & 10th",
    text: "NEP Based Stream & Subject Selection",
  },
  {
    _id: 2,
    image: "/assets/images/homepage/Sec2_2.svg",
    title: "Career Guidance",
    title2: "for Class 11th & 12th",
    text: "Course & Degree Selection",
  },
  {
    _id: 3,
    image: "/assets/images/homepage/Sec2_3.svg",
    title: "Career Guidance",
    title2: "for College & University Students",
    text: "Career Transition & Job Fitment",
  },
  {
    _id: 4,
    image: "/assets/images/homepage/Sec2_4.svg",
    title: "GlobalVidhya",
    title2: "University Admission",
    text: "Study Abroad or India End to End Application Guidance",
  },
];

export const whyChooseUsCards: WhyChooseUsCard[] = [
  {
    title: "Unbiased",
    description:
      "Online or offline career counselling with outcome based career decision making",
  },
  {
    title: "CCI Certified",
    description:
      "Career experts or mentors are not just usual neighbourhood career counsellors but trained industry professionals",
  },
  {
    title: "Personalized",
    description:
      "Sessions are not that standard copy paste one size fits all but customized for every client",
  },
  {
    title: "Scientific",
    description:
      "We are research based scientific organization working on multiple careers and core market problems",
  },
  {
    title: "For Everyone",
    description:
      "Our methodologies and processes are designed for both rural and urban population including underprivileged",
  },
  {
    title: "Deep Partnerships",
    description:
      "We collaborate with schools, colleges, universities & corporates to help their students & professionals",
  },
];
