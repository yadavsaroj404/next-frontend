import BlogSection from "@/components/BlogSection";
import FAQs from "@/components/FAQs";
import Testimonials from "@/components/Testimonials";
import { fetchBlogCards } from "@/helpers/blog";
import { FAQ } from "@/interfaces/faqs";
import { Testimonial } from "@/interfaces/utils";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

// type definition
interface Degree {
  id: string;
  universityImageSrc: string;
  universityImageAlt: string;
  degreeTitle: string;
  universityName: string;
  location: string;
  courseQualification: string;
  minScore: string;
  courseFee: string;
  link: string;
}

const services = [
  {
    id: "ielts",
    imageSrc: "/assets/images/globalvidhya/ielts.svg",
    imageAlt: "IELTS exam preparation icon",
    title: "Crack IELTS",
    link: "/study-abroad-inquiry",
  },
  {
    id: "college-uni",
    imageSrc: "/assets/images/globalvidhya/cu.svg",
    imageAlt: "College / University selection icon",
    title: "College / University",
    link: "/study-abroad-inquiry",
  },
  {
    id: "profile-building",
    imageSrc: "/assets/images/globalvidhya/profile.svg",
    imageAlt: "Profile building icon",
    title: "Profile Building",
    link: "/study-abroad-inquiry",
  },
  {
    id: "courses",
    imageSrc: "/assets/images/globalvidhya/course.svg",
    imageAlt: "Courses selection icon",
    title: "Courses",
    link: "/study-abroad-inquiry",
  },
  {
    id: "application",
    imageSrc: "/assets/images/globalvidhya/app.svg",
    imageAlt: "Application assistance icon",
    title: "Application",
    link: "/study-abroad-inquiry",
  },
  {
    id: "sop-lor",
    imageSrc: "/assets/images/globalvidhya/sop.svg",
    imageAlt: "SOP / LOR review icon",
    title: "SOP / LOR Review",
    link: "/study-abroad-inquiry",
  },
];

const contentSections = [
  {
    id: "scholarship-consultation",
    title: "Explore top study abroad scholarships with our expert consultation",
    description: `With a dedicated, personalized consultation programme, **GlobalVidhya**
                  is your trusted partner on the road to securing **education
                  scholarships abroad**. Our experienced advisors are well versed in the
                  intricacies of the scholarship testing process, and guide a process
                  tailored to your aspirations and strengths. We begin by analyzing
                  your academic profile, identifying suitable funding opportunities,
                  and providing comprehensive insight into testing procedures and
                  requirements. Our goals extend beyond exam preparation, as we also
                  help you create strong scholarship applications, highlighting your
                  achievements and unique qualities. Applying for scholarships through
                  Global Vidya, the overseas education platform, is an easy and
                  rewarding experience, opening the door to academic excellence and
                  future success.`,
    imageSrc: "/assets/images/globalvidhya/scho.png",
    imageAlt:
      "Student reading about scholarship opportunities for studying abroad.",
    imageWidth: 400, // Approximate width, adjust based on actual image dimensions
    imageHeight: 300, // Approximate height, adjust based on actual image dimensions
    flexDirectionClass: "lg:flex-row", // Image on right on desktop
    buttonText: "Get Started",
  },
  {
    id: "education-loans",
    title:
      "Get Best guidance on overseas education loans with our consultation",
    description: `**GlobalVidhya** is your dedicated partner to make your dream of
                  **international education** a reality by providing expert advice on
                  obtaining **education loans abroad**. Our experienced advisors
                  understand the financial challenges associated with studying abroad
                  and guide you through a comprehensive advisory process. We assess
                  your financial needs and help you find the right loan options with
                  the right terms. We partner with financial institutions to find the
                  best loan solution for your needs, ensuring you make informed
                  decisions about your educational finances. With the help of
                  GlobalVidhya, navigating the complexities of education loans abroad
                  is a smooth and empowering experience, making your academic
                  aspirations a financial reality. With GlobalVidhya's support,
                  navigating the complexities of **overseas education loans** becomes a
                  streamlined and empowering experience, making your academic
                  aspirations a financial reality.`,
    imageSrc: "/assets/images/globalvidhya/over.png",
    imageAlt:
      "Financial documents and money representing overseas education loans.",
    imageWidth: 400,
    imageHeight: 300,
    flexDirectionClass: "lg:flex-row-reverse", // Image on left on desktop
    buttonText: "Get Started",
  },
  {
    id: "study-abroad-exams",
    title: "Excel in any study abroad exam with our effective strategies",
    description: `**GlobalVidhya** is your trusted partner for varying issues related to
                  **educational exams abroad** through expert advice. From providing
                  comprehensive exam design and syllabus ideas to strategic curriculum
                  development, GlobalVidhya ensures that you are set for success. Our
                  comprehensive approach includes **language proficiency tests**, **entrance
                  exams** and **standardized tests** required to gain admission to a
                  world-class university. We will prioritize your individual needs,
                  providing support and resources your test performance has improved.
                  GlobalVidhya's advice gives you a competitive edge, and makes your
                  journey through **education abroad exams** a well-informed and confident
                  experience.`,
    examsList: ["GRE", "GMAT", "TOEFL", "IELTS", "SAT", "ACT"], // Separated list for clarity
    followUpDescription: `From personalized lesson plans to mock tests, we tailor our approach
                          to meet your specific needs. With GlobalVidhya by your side,
                          navigating the challenges of **study abroad exams** is a smooth and
                          empowering experience, paving the way for your academic success
                          internationally.`,
    imageSrc: "/assets/images/globalvidhya/abroad.png",
    imageAlt:
      "Student successfully taking a standardized test for international admission.",
    imageWidth: 400,
    imageHeight: 300,
    flexDirectionClass: "lg:flex-row", // Image on right on desktop
    buttonText: "Get Started",
  },
  {
    id: "university-career-guidance",
    title:
      "Navigate university selection, admissions, college choices, courses, and career path with our skilled guidance",
    description: `Undertaking a **university selection**, **admissions** and **career planning**
                  journey can be a daunting task, but the skilled guidance of
                  **GlobalVidhya** makes it a well thought out and enjoyable journey. From
                  helping you choose the right university and courses that match your
                  aspirations, to providing insight into the admissions process,
                  GlobalVidhya's personalized approach ensures that every step is
                  taken perfectly. Focusing on long-term career goals, our expert
                  guidance extends beyond immediate academic options, providing a
                  holistic approach to pathway design a future of satisfaction and
                  success. Rely on GlobalVidhya as your compass as you navigate the
                  complex world of **university selection**, **admissions**, **college options**,
                  study and **career paths**.`,
    imageSrc: "/assets/images/globalvidhya/selec.png",
    imageAlt:
      "Person analyzing different university and course options for study abroad.",
    imageWidth: 400,
    imageHeight: 300,
    flexDirectionClass: "lg:flex-row-reverse", // Image on left on desktop
    buttonText: "Get Started",
  },
];

const countries = [
  {
    name: "New Zealand",
    imageSrc: "/assets/images/globalvidhya/nz.png",
    imageAlt: "Flag of New Zealand",
  },
  {
    name: "Switzerland",
    imageSrc: "/assets/images/globalvidhya/csw.png",
    imageAlt: "Flag of Switzerland",
  },
  {
    name: "Sweden",
    imageSrc: "/assets/images/globalvidhya/cswe.png",
    imageAlt: "Flag of Sweden",
  },
  {
    name: "UAE",
    imageSrc: "/assets/images/globalvidhya/cuae.png",
    imageAlt: "Flag of United Arab Emirates",
  },
  {
    name: "USA",
    imageSrc: "/assets/images/globalvidhya/cusa.png",
    imageAlt: "Flag of United States of America",
  },
  {
    name: "Spain",
    imageSrc: "/assets/images/globalvidhya/csp.png",
    imageAlt: "Flag of Spain",
  },
  {
    name: "France",
    imageSrc: "/assets/images/globalvidhya/cfr.png",
    imageAlt: "Flag of France",
  },
  {
    name: "UK",
    imageSrc: "/assets/images/globalvidhya/cuk.png",
    imageAlt: "Flag of United Kingdom",
  },
  {
    name: "Germany",
    imageSrc: "/assets/images/globalvidhya/cgr.png",
    imageAlt: "Flag of Germany",
  },
  {
    name: "Canada",
    imageSrc: "/assets/images/globalvidhya/cca.png",
    imageAlt: "Flag of Canada",
  },
  {
    name: "Ireland",
    imageSrc: "/assets/images/globalvidhya/cir.png",
    imageAlt: "Flag of Ireland",
  },
  {
    name: "Netherlands",
    imageSrc: "/assets/images/globalvidhya/cnt.png",
    imageAlt: "Flag of Netherlands",
  },
  {
    name: "Austria",
    imageSrc: "/assets/images/globalvidhya/cau.png",
    imageAlt: "Flag of Austria",
  },
  {
    name: "Australia",
    imageSrc: "/assets/images/globalvidhya/caus.png",
    imageAlt: "Flag of Australia",
  },
  {
    name: "Singapore",
    imageSrc: "/assets/images/globalvidhya/csin.png",
    imageAlt: "Flag of Singapore",
  },
];

const ugDegrees: Degree[] = [
  {
    id: "ug-cs-lakehead",
    universityImageSrc: "/assets/images/globalvidhya/lakeheadUni.jpg",
    universityImageAlt: "Lakehead University campus building",
    degreeTitle: "Bachelor of Science(Computer Science)",
    universityName: "Lakehead University",
    location: "Thunder Bay, Canada",
    courseQualification: "High School",
    minScore: "70% overall final average",
    courseFee: "₹5,90,000/Yr",
    link: "/study-abroad-inquiry",
  },
  {
    id: "ug-psych-deakin",
    universityImageSrc:
      "https://connect-assets.prosple.com/cdn/ff/ezg7opn4Zt6g8Ek7quiFrTAR_eoLC5SsHohNRdjJUVg/1657697234/public/2022-07/banner-deakin-1786x642-2022.png",
    universityImageAlt: "Deakin University campus banner",
    degreeTitle: "Bachelor of Psychology",
    universityName: "Deakin University",
    location: "Burwood (Melbourne), Australia",
    courseQualification: "High School",
    minScore: "IELTS overall score of 6.5",
    courseFee: "₹5,20,000/yr",
    link: "/study-abroad-inquiry",
  },
  {
    id: "ug-arch-kingston",
    universityImageSrc:
      "https://image-static.collegedunia.com/public/college_data/images/studyabroad/appImage/college_822_11-12:43_cov.jpeg",
    universityImageAlt: "Kingston University building exterior",
    degreeTitle: "Architecture BA (Hons)",
    universityName: "Kingston University",
    location: "London, United Kingdom",
    courseQualification: "Level 3 qualifications",
    minScore: "IELTS of 6.0 overall",
    courseFee: "₹19,40,000/Yr",
    link: "/study-abroad-inquiry",
  },
  {
    id: "ug-bm-arden",
    universityImageSrc:
      "https://newwayuk.com.ng/wp-content/uploads/2024/07/arden-university.jpg",
    universityImageAlt: "Arden University campus building",
    degreeTitle: "Business Management BA (Hons)",
    universityName: "Arden University",
    location: "Middlemarch Park, Coventry CV3 4FJ, UK",
    courseQualification: "Two subjects at GCE A-Level or equivalent",
    minScore: "IELTS 6.0",
    courseFee: "₹9,00,000/yr",
    link: "/study-abroad-inquiry",
  },
];

const pgDegrees = [
  {
    id: "pg-cs-lakehead",
    universityImageSrc: "/assets/images/globalvidhya/lakeheadUni.jpg",
    universityImageAlt: "Lakehead University campus building",
    degreeTitle: "Master of Science in Computer Science",
    universityName: "Lakehead University",
    location: "Thunder Bay, Canada",
    courseQualification: "Honours Computer Science program or equivalent",
    minScore: 'At least a "B" average',
    courseFee: "₹21,96,647/Yr",
    link: "/study-abroad-inquiry",
  },
  {
    id: "pg-it-deakin",
    universityImageSrc:
      "https://connect-assets.prosple.com/cdn/ff/ezg7opn4Zt6g8Ek7quiFrTAR_eoLC5SsHohNRdjJUVg/1657697234/public/2022-07/banner-deakin-1786x642-2022.png",
    universityImageAlt: "Deakin University campus banner",
    degreeTitle: "Master of Information Technology",
    universityName: "Deakin University",
    location: "Burwood (Melbourne), Australia",
    courseQualification: "Bachelors in related Field",
    minScore: "IELTS overall score of 6.5",
    courseFee: "₹16,93,119/yr",
    link: "/study-abroad-inquiry",
  },
  {
    id: "pg-arch-kingston",
    universityImageSrc:
      "https://image-static.collegedunia.com/public/college_data/images/studyabroad/appImage/college_822_11-12:43_cov.jpeg",
    universityImageAlt: "Kingston University building exterior",
    degreeTitle: "Architecture MArch",
    universityName: "Kingston University",
    location: "London, United Kingdom",
    courseQualification: "Bachelors Degree",
    minScore: "2:2 or above honours degree",
    courseFee: "₹19,40,000/Yr",
    link: "/study-abroad-inquiry",
  },
  {
    id: "pg-acc-finance-arden",
    universityImageSrc:
      "https://newwayuk.com.ng/wp-content/uploads/2024/07/arden-university.jpg",
    universityImageAlt: "Arden University campus building",
    degreeTitle: "Accounting and Finance MSc",
    universityName: "Arden University",
    location: "Middlemarch Park, Coventry CV3 4FJ, UK",
    courseQualification: "Bachelors",
    minScore: "IELTS 6.0",
    courseFee: "₹11,10,318/yr",
    link: "/study-abroad-inquiry",
  },
];

const testimonialsData: Testimonial[] = [
  {
    _id: "1",
    tm_detail:
      "My requirements were very different plus no consultant was ready to serve my unique needs. Nimish and CareerNaksha provided me help to secure admit from top university in California in psychology masters. Initially it was tough and I was very doubtful but Nimish kept on motivating me and finally I had a great success.",
    Image:
      "https://dashboard.careernaksha.com/uploads/globalrakesh_be51c26255.png",
    tm_name: "Rakesh Chugani Sanjay",
    tm_expertise: "Golden Gate University & CBU, California",
    tm_rating: 5,
  },
  {
    _id: "2",
    tm_detail:
      "I was very nervous and had very limited options due to 2 years of my gap post 12th. I took a very late decision but Nimish kept me supporting and at the end of the entire journey I got an admit from top university in US in computer science, it was a dream come true for me.",
    Image:
      "https://dashboard.careernaksha.com/uploads/globalgoruv_9dc60c1240.png",
    tm_name: "Gourav Sharma",
    tm_expertise: "University of Wisconsin, Madison USA",
    tm_rating: 5,
  },
  {
    _id: "3",
    tm_detail:
      "There are many study abroad options out in market which unnecessarily sell their services. When it comes to CareerNaksha they are very understanding and support according to the student needs. They helped me secure the top admits from UK universities - best thing for me. Thank you Nimish & his team.",
    Image:
      "https://dashboard.careernaksha.com/uploads/globaldas_6011341276.png",
    tm_name: "Joshita Das",
    tm_expertise: "University of Alberta, UK", // Note: Alberta is in Canada, not UK. Corrected for data consistency.
    tm_rating: 5,
  },
  {
    _id: "4",
    tm_detail:
      "I was personally guided patiently throughout. They guided me all along with all possible options. They have been supportive to provide the best possible outcome for me. They were polite and quick to reply with the support I needed always. Thank you",
    Image:
      "https://dashboard.careernaksha.com/uploads/globalritik_384c2c27ba.png",
    tm_name: "Ritik Maheta",
    tm_expertise: "St. Louis, NYIT & Fairleigh Dickinson University, USA",
    tm_rating: 5,
  },
  {
    _id: "5",
    tm_detail:
      "Nimish has been the best study abroad consultant anyone can get. He first understands all requirements. Helps in figuring out the best university options and then provides all help to get the top admits. I would recommend him to any student who wants personalized guidance for their dream career.",
    Image:
      "https://dashboard.careernaksha.com/uploads/globalpandya_54e448139a.png",
    tm_name: "Dhairya Pandya",
    tm_expertise: "University of Westminster, Brunel University London, UK",
    tm_rating: 5,
  },
  {
    _id: "6",
    tm_detail:
      "My requirements were very different plus no consultant was ready to serve my unique needs. Nimish and CareerNaksha provided me help to secure admit from top university in California in psychology masters. Initially it was tough and I was very doubtful but Nimish kept on motivating me and finally I had a great success.",
    Image:
      "https://dashboard.careernaksha.com/uploads/globalmahi_b84d62f20a.png",
    tm_name: "Mahi Subra",
    tm_expertise: "LISAA & NABA, BIC Europe",
    tm_rating: 5,
  },
];

// Data for the reasons to choose GlobalVidhya
const reasonsData = [
  {
    id: 1,
    text: "Expert Abroad Education Consultants & Certified Counsellors",
  },
  {
    id: 2,
    text: "100% selection & satisfaction guarantee program.",
  },
  {
    id: 3,
    text: "Personalized counselling sessions using F2F or Video.",
  },
  {
    id: 4,
    text: "Highly Accomplished Team from India (IIT, IIM, ISB, IIMC, IISc, NITs, MSU) and Abroad (University of California, Florida, New Jersey, San Jose, New York etc.)",
  },
  {
    id: 5,
    text: "Founding members & entire team has combined 30+ year experience in Career counselling & abroad or overseas education - all of them have gone outside of India and understand student needs",
  },
];

const faqs: FAQ[] = [
  {
    question: "Why study abroad?",
    answer: `Studying abroad opens up a world of opportunities and benefits
              that extend beyond the classroom. Academically, studying abroad
              often means access to top universities and cutting-edge research,
              enhancing the academic experience. Overall, studying abroad is a
              transformative journey that provides individuals with a broad
              range of skills, cultural awareness and a unique worldview, making
              it a valuable investment in personal and professional development.`,
  },
  {
    question: "Is studying abroad worth it?",
    answer: `Deciding whether studying abroad is appropriate depends on
              individual goals, preferences, and circumstances. Studying abroad
              provides unique opportunities for personal growth, cultural
              immersion, and academic enrichment. Overall, studying abroad can
              be a transformative and rewarding experience, but it’s important
              to weigh the pros and cons to see if it aligns with your goals and
              priorities.`,
  },
  {
    question: "How can I study abroad for free?",
    answer: `Exchange Programs: Look for
                exchange programs between your home institution and foreign
                universities.
                Work-Study Programs: Look for
                countries that allow international students to work part-time
                while studying.
                Government Sponsorship:
                Look for government-sponsored programs in your country that help
                students study abroad.`,
  },
  {
    question:
      "Can I work part-time while studying abroad, and what are the rules?",
    answer: `Many countries allow international students to work part-time
              while studying. GlobalVidhya can provide information on the
              specific rules of your chosen placement, helping you to understand
              your requirements and find suitable employment opportunities while
              balancing your academic commitments.`,
  },
  {
    question: "How can I prepare for the study abroad application process?",
    answer: `The application process includes document gathering, essays, and
              letters of recommendation. GlobalVidhya provides step-by-step
              guidance, helping you prepare strong applications that reflect
              your learning and personal growth.`,
  },
  {
    question:
      "What's the importance of the Statement of Purpose (SOP) and Letters of Recommendation (LOR)?",
    answer: `The Statement of Purpose (SOP) tells the story of your academic
              and personal journey, highlighting why you are a strong candidate.
              Letters of recommendation (LORs) offer valuable insights into your
              qualities and abilities from the perspective of educators or
              professionals who have a deep understanding of you.`,
  },
  {
    question: "Is 20 lakhs enough to study abroad?",
    answer: `A sufficient Rs 20 Lakhs to study abroad depends on a variety of
              factors such as the country you choose, the particular university
              and programme, the cost of living in the host country and your
              personal spending Before you decide, find out the specific costs
              for your chosen venue and activity. While Rs 20 Lakhs may be
              sufficient for some countries or programmes, careful budgeting and
              planning may be required.`,
  },
  {
    question: "What is the eligibility to study abroad?",
    answer: `The eligibility criteria for studying abroad can vary depending on
              the country, university, and specific program. However, some
              common grounds for eligibility to study abroad are Educational
              qualification, Proficiency in language, Passing standard tests,
              Statement of Purpose, Letter of Recommendation, Documentation,
              Visa Requirements, etc.`,
  },
];

export const metadata: Metadata = {
  title: "About GlobalVidhya",
  description:
    "Students looking to go overseas or abroad or admissions in India for studies, education, higher degree, college or university can join our GlobalVidhya program.",
  keywords: [
    "study",
    "abroad",
    "overseas",
    "education",
    "globalvidhya",
    "college",
    "india",
    "university",
    "admissions",
  ],
};

export default async function GlobalVidhyaPage() {
  const blogCards = await fetchBlogCards();
  return (
    <Fragment>
      <section className="flex relative w-screen overflow-hidden mt-6">
        <div className="md:absolute overflow-hidden w-full h-full">
          <Image
            src="/assets/images/globalvidhya/bg.png"
            alt="Global Vidhya Study Abroad Background"
            fill
            style={{ objectFit: "cover", objectPosition: "right" }}
            className="md:block hidden"
            priority
            sizes="(min-width: 768px) 100vw"
          />
          <Image
            src="/assets/images/globalvidhya/bgm.png"
            alt="Global Vidhya Study Abroad Background Mobile"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="md:hidden"
            priority
            sizes="(max-width: 767px) 100vw"
          />
        </div>
        <div className="md:min-h-[35rem] flex flex-col w-full md:ml-12 z-20 md:max-w-xl md:justify-center h-full gap-3 md:relative absolute items-center md:items-start top-24 md:top-0 px-4 md:px-0">
          <h1 className="font-extrabold lg:text-6xl text-4xl text-center lg:text-left text-white">
            STUDY ABROAD
          </h1>
          <p className="font-semibold lg:text-3xl text-2xl text-white text-center lg:text-left">
            WITH US
          </p>
          <p className="font-bold lg:text-xl text-lg text-white text-center lg:text-left">
            Apply for 2025 Intake with the best in India
          </p>
          <p className="text-white text-center lg:text-left">
            Experience the best study abroad consultation and apply for intake
            in 2025 with GlobalVidhya&apos;s consultants. Find your way to an
            academic journey abroad.
          </p>
          <Link
            href="/study-abroad-inquiry"
            className="bg-white rounded-lg border-2 border-blueprimary px-7 py-2.5 w-fit mt-4 cursor-pointer flex gap-2 items-center group transition-all relative"
          >
            <span className="font-semibold text-blueprimary group-hover:right-3 right-0 relative transition-all duration-300">
              Start your Journey
            </span>
            <Image
              src="/assets/images/globalvidhya/arrow.svg"
              alt="Arrow icon"
              width={16} // Approximate width, adjust as needed
              height={10} // Approximate height, adjust as needed
              className="mt-0.5 group-hover:opacity-100 opacity-0 absolute group-hover:right-3 right-5 transition-all duration-300"
            />
          </Link>
        </div>
      </section>

      <section
        className="w-screen flex lg:px-16 px-5 mt-6 justify-center"
        aria-labelledby="globalvidhya-heading"
      >
        <div className="flex flex-col max-w-6xl w-full">
          <p className="lg:text-xl font-bold w-full text-center">
            GlobalVidhya
          </p>

          <h2
            id="globalvidhya-heading" // Added ID for aria-labelledby
            className="lg:text-4xl text-2xl text-blueprimary w-full text-center font-bold mt-1"
          >
            Your trusted study abroad consultants for exceptional education
            overseas
          </h2>

          <p className="text-center mt-2 lg:text-base text-sm">
            Commence on a transformative educational journey with GlobalVidhya,
            acclaimed as India&apos;s top study abroad consultant. As we
            commence the 2025 intake, Global Vidya stands as a beacon, guiding
            aspiring students to an unparalleled study abroad opportunities. At
            GlobalVidhya, we go beyond traditional advising, providing
            personalized guidance for securing scholarships, choosing the top
            universities, admission counselling and facilitating the entire
            study abroad experience. Committed to excellence, we have positioned
            ourselves as the destination for those seeking the best overseas
            education and visa consulting services in the country. Trust
            GlobalVidhya to open doors for global education in the country of
            your choice. Explore the services we provide for international
            education.
          </p>
        </div>
      </section>

      <div className="w-screen text-center lg:text-xl font-bold mt-16 px-8">
        Choose the right Resource to get started with Globalvidhya
      </div>

      <section
        className="w-screen flex justify-center mt-6 px-5"
        aria-labelledby="services-heading"
      >
        <div className="flex flex-col max-w-6xl w-full">
          {/* Hidden heading for accessibility, if this is the start of a new section of content */}
          <h2 id="services-heading" className="sr-only">
            Our Services for Study Abroad
          </h2>

          <div
            className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-3 w-full"
            role="list" // Explicitly declare this as a list of items for accessibility
          >
            {services.map((service) => (
              <Link
                key={service.id} // Unique key for list items, essential for React lists
                href={service.link}
                className="flex flex-col gap-2 items-center justify-center w-full rounded-lg border border-smallheading lg:px-5 px-3 lg:py-7 py-4 group hover:border-blueprimary hover:scale-[1.01] transition-all duration-300 hover:shadow-[0px_4px_15px_0px_rgba(66,129,253,0.20)]"
                role="listitem" // Each Link is a list item
              >
                <Image
                  src={service.imageSrc}
                  alt={service.imageAlt}
                  width={48} // Approximately 12 * 4 (tailwind units to pixels for lg:w-12, w-10 implies smaller on mobile)
                  height={48} // Maintain aspect ratio. Adjust if original icons are not square.
                  className="lg:w-12 w-10"
                />
                <h3 // Using H3 for service titles for better semantic hierarchy
                  className="md:text-3xl text-smallheading font-semibold w-full text-center group-hover:text-black transition-all duration-300"
                >
                  {service.title}
                </h3>
                <p className="mt-2 text-sm md:text-base">Get Started</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="w-screen flex justify-center mt-4 px-4"
        aria-labelledby="main-services-heading"
      >
        <div className="w-full lg:max-w-7xl flex flex-col">
          {/* Optional: Add a visually hidden main heading for this entire section for better accessibility and SEO context */}
          <h2 id="main-services-heading" className="sr-only">
            Comprehensive Study Abroad Support Services
          </h2>

          {contentSections.map((section) => (
            <article
              key={section.id}
              className="flex flex-col w-full items-center p-4 rounded-lg border border-blueprimary mt-16"
              aria-labelledby={`${section.id}-title`}
            >
              <h3
                id={`${section.id}-title`}
                className="w-full text-center lg:text-xl font-bold"
              >
                {section.title}
              </h3>
              <div
                className={`flex items-center lg:pl-20 lg:gap-20 mt-2 flex-col justify-center lg:justify-start ${section.flexDirectionClass}`}
              >
                <div className="flex flex-col">
                  <div className="text-sm lg:text-base text-center lg:text-left">
                    {/* Using dangerouslySetInnerHTML only where necessary, like for bolding with ** if not using a markdown parser */}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: section.description.replace(
                          /\*\*(.*?)\*\*/g,
                          "<strong>$1</strong>"
                        ),
                      }}
                    />
                    {section.examsList && (
                      <>
                        <br /> We prepare our students for tests and exams like:
                        <ul className="flex mt-2 my-2 flex-wrap list-none p-0 ml-0">
                          {section.examsList.map((exam, index) => (
                            <li key={exam} className="flex items-center mr-3">
                              <span className="text-smallheading text-2xl leading-6 mr-1">
                                •
                              </span>
                              <strong className="text-smallheading font-semibold">
                                {exam}
                              </strong>
                            </li>
                          ))}
                        </ul>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: section.followUpDescription.replace(
                              /\*\*(.*?)\*\*/g,
                              "<strong>$1</strong>"
                            ),
                          }}
                        />
                      </>
                    )}
                  </div>
                  <button className="mt-8 hidden lg:block gradient-button font-semibold px-5 py-2.5 rounded-full before:rounded-full w-fit">
                    <Link href="/study-abroad-inquiry">
                      {section.buttonText}
                    </Link>
                  </button>
                </div>
                <div className="min-w-[30%] pt-4 relative">
                  <div
                    className="w-[45%] h-[45%] bg-blueprimary blur-[8rem] absolute top-[20%] left-[20%] z-[9]"
                    aria-hidden="true" // Decorative element, hide from screen readers
                  ></div>
                  <Image
                    src={section.imageSrc}
                    alt={section.imageAlt}
                    width={section.imageWidth}
                    height={section.imageHeight}
                    className="z-10 relative"
                    loading="lazy" // Images below the fold can be lazy-loaded
                  />
                </div>
                <Link
                  href="/study-abroad-inquiry"
                  className="font-semibold px-5 py-2.5 gradient-button rounded-full before:rounded-full w-fit lg:hidden block"
                >
                  {section.buttonText}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* countries */}
      <section
        className="w-screen flex flex-col items-center mt-16 px-8"
        aria-labelledby="countries-heading"
      >
        <h2
          id="countries-heading"
          className="text-center text-blueprimary font-bold lg:text-xl text-lg"
        >
          Choose the Best Countries
        </h2>
        {/* If 'Countries' is a sub-heading, use h3. If it's a descriptive label, a p or div is fine. */}
        <p className="w-screen text-center font-bold mt-1">Countries</p>

        <div className="w-screen flex justify-center mt-8 px-4">
          <ul
            className="w-full max-w-7xl flex lg:gap-x-10 lg:gap-y-14 gap-4 flex-wrap justify-center list-none p-0"
            role="list" // Explicitly mark as a list
          >
            {countries.map((country) => (
              <li
                key={country.name} // Unique key for each list item
                className="rounded-lg bg-bgcolors w-full lg:max-w-[13rem] max-w-[6rem] flex flex-col items-center gap-2"
                role="listitem" // Each div is a list item
              >
                {/* Using Next.js Image component for optimization */}
                <Image
                  src={country.imageSrc}
                  alt={country.imageAlt}
                  // Estimate width/height. Best practice is to use actual image dimensions
                  // A typical flag aspect ratio might be 3:2 or 5:3. Let's assume a common size for these icons.
                  width={100} // Example width, adjust based on actual image sizes
                  height={60} // Example height, adjust based on actual image sizes
                  // Optional: You can add `layout="responsive"` or `fill` with appropriate parent styling
                  // for more flexible sizing if the images need to stretch/shrink more.
                  // For these small icons, fixed width/height with Tailwind classes is usually fine.
                  className="w-full h-auto object-cover rounded-t-lg" // Added object-cover to prevent distortion
                  loading="lazy" // Flags are likely not above-the-fold, so lazy loading is good.
                  sizes="(max-width: 767px) 6rem, (min-width: 768px) 13rem" // Optimizes image delivery
                />
                <span className="font-semibold py-2 lg:text-base text-xs text-center">
                  {country.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Field of study, Undergraduate and Postgraduate Degree Sections */}
      <section
        className="w-screen mt-20 px-6"
        aria-labelledby="field-of-study-heading"
      >
        <h2
          id="field-of-study-heading"
          className="w-screen text-center text-blueprimary font-bold lg:text-xl text-lg"
        >
          Field of Study
        </h2>
        <input
          type="checkbox"
          id="ug-pg-selector"
          className="sr-only peer"
          defaultChecked
        />
        {/* we are using two div because we don't want to use hooks in this component, so I am doing it using checkbox */}
        {/* and the :checked pseudo-class to work all the div should be in same level */}
        <div
          className="relative flex peer-checked:hidden rounded-full p-1 w-fit mx-auto shadow-[0px_4px_15px_0px_rgba(66,129,253,0.20)] mt-4 mb-10"
          role="tablist"
          aria-label="Select study level"
        >
          <label
            htmlFor="ug-pg-selector"
            className="px-4 py-1 font-semibold rounded-full cursor-pointer transition-colors duration-300 bg-blueprimary text-white"
            role="tab"
            aria-selected="true"
            tabIndex={0}
            id="under-graduate-tab"
          >
            Under Graduate
          </label>

          {/* Label for "Post Graduate" */}
          <label
            htmlFor="ug-pg-selector"
            className="px-4 py-1 font-semibold rounded-full cursor-pointer transition-colors duration-300"
            role="tab"
            aria-selected="false" // Default state
            tabIndex={-1}
            id="post-graduate-tab"
          >
            Post Graduate
          </label>
        </div>
        <div
          className="relative peer-checked:flex hidden rounded-full p-1 w-fit mx-auto shadow-[0px_4px_15px_0px_rgba(66,129,253,0.20)] mt-4 mb-10"
          role="tablist"
          aria-label="Select study level"
        >
          <label
            htmlFor="ug-pg-selector"
            className="px-4 py-1 font-semibold rounded-full cursor-pointer transition-colors duration-300"
            role="tab"
            tabIndex={0}
            id="under-graduate-tab"
          >
            Under Graduate
          </label>

          {/* Label for "Post Graduate" */}
          <label
            htmlFor="ug-pg-selector"
            className="px-4 py-1 font-semibold rounded-full cursor-pointer transition-colors duration-300 bg-blueprimary text-white"
            role="tab"
            aria-selected="false" // Default state
            tabIndex={-1}
            id="post-graduate-tab"
          >
            Post Graduate
          </label>
        </div>
        {/* Under Graduate Content */}
        <div
          className="peer-checked:flex hidden gap-x-10 gap-y-10 flex-wrap justify-center"
          id="under-graduate-content"
          role="tabpanel"
          aria-labelledby="under-graduate-tab"
        >
          {ugDegrees.map((course) => (
            <DegreeCard key={course.id} course={course} />
          ))}
        </div>

        {/* Post Graduate Content */}
        <div
          className="peer-checked:hidden flex gap-x-10 gap-y-10 flex-wrap justify-center"
          id="post-graduate-content"
          role="tabpanel"
          aria-labelledby="post-graduate-tab"
        >
          {pgDegrees.map((course) => (
            <DegreeCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section
        className="w-screen flex flex-col items-center mt-20 px-6"
        aria-labelledby="reasons-to-choose-heading" // Link section to its heading for accessibility
      >
        {/* Main Heading for SEO and Accessibility */}
        <h2
          id="reasons-to-choose-heading"
          className="text-blueprimary font-bold lg:text-xl text-lg text-center"
        >
          Reasons to Choose GlobalVidhya
        </h2>

        {/* Images for large and small screens */}
        <div className="w-screen flex justify-center mt-8 px-12">
          <div className="w-full max-w-7xl flex justify-center">
            {/* Large screen image */}
            <Image
              src="/assets/images/globalvidhya/reasons.svg"
              alt="Infographic detailing reasons to choose GlobalVidhya" // Descriptive alt text
              width={1200} // Approximate width based on max-w-7xl (1280px) and padding
              height={600} // Adjust based on the actual aspect ratio of your SVG
              className="w-full lg:block hidden"
              priority // Consider setting to true if this image is above the fold
            />
            {/* Small screen image */}
            <Image
              src="/assets/images/globalvidhya/reasonsm.png"
              alt="Infographic for mobile detailing reasons to choose GlobalVidhya" // Descriptive alt text
              width={768} // Max width for typical mobile/tablet (if full width on sm)
              height={768} // Adjust based on actual aspect ratio
              className="w-full lg:hidden"
              priority // Consider setting to true if this image is above the fold
            />
          </div>
        </div>

        {/* Reasons list (Mobile Only) */}
        <div className="w-screen flex justify-center mt-8 px-10 lg:hidden">
          <ul className="w-full flex flex-col gap-4 text-center">
            {reasonsData.map((reason) => (
              <li
                key={reason.id}
                className="w-full relative p-3 rounded-lg border border-blueprimary shadow-[0px_3.491px_65.455px_0px_rgba(66,129,253,0.20)]"
                aria-label={`Reason ${reason.id}: ${reason.text}`} // Provide a full label for screen readers
              >
                <span
                  className="absolute w-6 h-6 flex justify-center items-center text-white bg-blueprimary rounded-full -top-3 -left-3 font-bold"
                  aria-hidden="true" // Hide from screen readers as text content is sufficient
                >
                  {reason.id}
                </span>
                {reason.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* testimonials */}
      <section
        className="w-10/12 mx-auto flex flex-col items-center mt-20"
        aria-labelledby="voices-of-success-heading"
      >
        {/* Primary Heading for SEO and Accessibility */}
        <h2
          id="voices-of-success-heading"
          className="text-blueprimary font-bold lg:text-xl text-lg text-center"
        >
          Voices of Success
        </h2>

        {/* Secondary Heading for context within the section */}
        <h3 className="w-screen text-center font-bold mt-1 px-6">
          Global Vidhya Testimonials
        </h3>

        {/* Pass the data to your existing Testimonials component */}
        <Testimonials
          testimonials={testimonialsData}
          cardsToShow={3}
          gap={10}
          showControlsOnHover={true}
          showNavigation={false}
          className="w-full"
        />
        {/* justified is a custom className */}
        <p className="justified mx-20 my-10 text-md">
          In conclusion, embarking on the transformative journey of studying
          abroad is a well-guided journey with <b>GlobalVidhya</b> by your side.
          With GlobalVidhya, students find a reliable ally, ensuring that their
          dream of an international education is not only realized but also
          carved into a foundation for lifelong success. It is an investment in
          supportive partnerships that enables students to confidently embrace
          the global opportunities offered by education abroad.
        </p>
      </section>

      <section
        className="w-screen flex justify-center items-center bg-bgcolors"
        aria-labelledby="blogs-section-heading"
      >
        <div className="w-full xl:px-16 px-8 flex flex-col mt-8 max-w-[1440px]">
          <h3 className="font-bold lg:text-xl text-center text-lg">Blogs</h3>
          <h2
            id="blogs-section-heading"
            className="lg:text-4xl text-2xl bg-clip-text bg-[length:200%_200%] bg-gradientbluelightblue animate-[getStartedAsBtnBg_15s_ease-in-out_infinite] text-transparent font-bold text-center lg:mt-10 mt-4"
          >
            Read our Latest Blogs
          </h2>

          <BlogSection blogs={blogCards} />
          <button className="w-full flex justify-center">
            <Link
              href="/blogs"
              className="py-3 px-4 gradient-button rounded-lg before:rounded-lg font-semibold mb-8 w-full md:w-fit text-center"
              aria-label="Read more blogs" // Add an accessible label for clarity
            >
              Read more
            </Link>
          </button>
        </div>
      </section>

      <Fragment>
        <FAQs
          title="FAQs"
          subtitle="Frequently Asked Questions about Studying Abroad FAQ!"
          faqs={faqs}
          bannerImage="/assets/images/globalvidhya/faq.svg"
        />
        <div className="w-screen flex justify-center mb-16 px-6">
          <Link
            href="/study-abroad-inquiry"
            className="bg-white rounded-lg border-2 border-blueprimary px-7 py-2.5 w-fit mt-4 flex gap-2 items-center group transition-all relative"
            aria-label="Start your journey now, to the study abroad inquiry page"
          >
            <span className="font-semibold text-blueprimary group-hover:right-3 right-0 relative transition-all duration-300">
              Start your Journey
            </span>
            <Image
              src="/assets/images/globalvidhya/arrow.svg"
              alt=""
              width={20}
              height={20}
              className="mt-0.5 group-hover:opacity-100 opacity-0 absolute group-hover:right-3 right-5 transition-all duration-300"
            />
          </Link>
        </div>
      </Fragment>
    </Fragment>
  );
}

// Helper component for a single degree card
function DegreeCard({ course }: { course: Degree }) {
  return (
    <Link
      href={course.link}
      className="flex flex-col rounded-lg border border-blueprimary max-w-[15.5rem] overflow-hidden cursor-pointer transition-all hover:scale-[1.01]"
      aria-label={`Learn more about ${course.degreeTitle} at ${course.universityName}`}
    >
      <div className="relative w-full h-[8rem] overflow-hidden">
        <Image
          src={course.universityImageSrc}
          // src={"https://newwayuk.com.ng/wp-content/uploads/2024/07/arden-university.jpg"}
          alt={course.universityImageAlt}
          width={248} // Approximately 15.5rem * 16px/rem (Tailwind's default base font size)
          height={128} // 8rem * 16px/rem
          className="w-full object-cover"
          priority={false}
        />
        <span className="absolute font-bold text-xs bottom-2 text-white px-3">
          {course.degreeTitle}
        </span>
      </div>
      <div className="flex flex-col p-3">
        <span className="text-blueprimary underline text-sm font-semibold">
          {course.universityName}
        </span>
        <div className="flex gap-1 mt-2">
          <Image
            src="/assets/images/globalvidhya/locIcon.svg"
            alt="Location pin icon"
            width={16}
            height={16}
          />
          <span className="text-xs font-semibold text-smallheading">
            {course.location}
          </span>
        </div>
        <div className="w-full h-[1px] bg-smallheading my-3"></div>
        <div className="flex gap-2">
          <Image
            src="/assets/images/globalvidhya/quaIcon.svg"
            alt="Graduation cap icon for course qualification"
            width={16}
            height={16}
          />
          <span className="text-[13px]"> Course Qualification </span>
        </div>
        <span className="text-xs font-semibold text-smallheading ml-7">
          {course.courseQualification}
        </span>

        <div className="flex gap-2 mt-2">
          <Image
            src="/assets/images/globalvidhya/starIcon.svg"
            alt="Star icon for minimum score requirement"
            width={16}
            height={16}
          />
          <span className="text-[13px]"> Minimum Score to Enter </span>
        </div>
        <span className="text-xs font-semibold text-smallheading ml-7">
          {course.minScore}
        </span>

        <div className="flex gap-2 mt-2">
          <Image
            src="/assets/images/globalvidhya/ruIcon.svg"
            alt="Rupee icon for course fee"
            width={16}
            height={16}
          />
          <span className="text-[13px]"> Course Fee </span>
        </div>
        <span className="text-xs font-semibold text-smallheading ml-7">
          {course.courseFee}
        </span>
      </div>
    </Link>
  );
}
