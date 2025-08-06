// core react and next imports
import Image from "next/image";
import { Fragment } from "react";

// interfaces
import { FAQ } from "@/interfaces/faqs";
import { Testimonial } from "@/interfaces/utils";

// custom components
import FAQs from "@/components/FAQs";
import Testimonials from "@/components/Testimonials";

// client components of this page
// so that rest of the page can be static
import KnowMore from "./KnowMore";
import LevelsOfNCCP from "./LevelsOfNCCP";
import GetCertified from "./GetCertified";

export default function CareerCounsellorProgramPage() {
  const statCardsData = [
    {
      imageSrc: "/assets/images/nccp/st1.png",
      altText:
        "An illustration of a compass pointing to a successful career path",
      text: "Your Final Destination to Become a Successful Career Counsellor",
    },
    {
      imageSrc: "/assets/images/nccp/st2.png",
      altText: "An illustration of a mentor guiding students and professionals",
      text: "Guide Students & Professionals & Acquire Advance Skills",
    },
    {
      imageSrc: "/assets/images/nccp/st3.png",
      altText: "An illustration of an analytical dashboard for career skills",
      text: "Assess The Best Career Technology & Psychometrics of the World",
    },
  ];

  // Data for the growth timeline
  const growthTimelineData = [
    {
      value: "15L",
      description: "Min 15 Lakh counsellors required for 140 Cr Population",
    },
    {
      value: "90%",
      description: "90% need in Tier 2-3-4 cities or villages of Bharat",
    },
    {
      value: "99%",
      description:
        "99% of the career psychometrics & counselling solutions are Biased",
    },
  ];

  // Data for the growth opportunity cards
  const growthOpportunityData = [
    {
      percentage: "90%",
      description:
        "Indians are unsatisfied in their jobs, careers or not happy in what they are currently doing",
      imageSrc: "/assets/images/nccp/gro1.png",
      altText: "An illustration of a person thinking about their career",
    },
    {
      percentage: "60%",
      description:
        "Students career decisions are influenced by their Peers, parents and relatives fully biased",
      imageSrc: "/assets/images/nccp/gro2.png",
      altText: "An illustration of students discussing their career options",
    },
    {
      percentage: "45%",
      description:
        "Student Population in India are confused or not aware of their strengths & weaknesses",
      imageSrc: "/assets/images/nccp/gro3.png",
      altText:
        "An illustration of a student feeling confused about their future",
    },
  ];

  const whyCardsData = [
    {
      imageSrc: "/assets/images/nccp/why1.png",
      altText: "An icon representing career growth",
      title: "Build A Career In Career Counselling",
      description:
        "To build a strong entrepreneurial high-in-demand career counselling & vocational guidance setup",
    },
    {
      imageSrc: "/assets/images/nccp/why2.png",
      altText: "An icon representing networking",
      title: "Build A Network",
      description:
        "Network with like-minded counsellors, educators, industry professionals, psychologists & govt. officials",
    },
    {
      imageSrc: "/assets/images/nccp/why3.png",
      altText: "An icon representing an expert mentor",
      title: "Become An Expert",
      description:
        "Acquire expertise through hands on case studies, live sessions, projects, assignments & market exposure",
    },
    {
      imageSrc: "/assets/images/nccp/why4.png",
      altText: "An icon representing tools and technology",
      title: "Utilize all tools, technology & online material",
      description:
        "Utilize all tools, online material, career reports, career assessments & career platform at exclusive pricing",
    },
    {
      imageSrc: "/assets/images/nccp/why5.png",
      altText: "An icon representing learning from leaders",
      title: "Learn From The Best",
      description:
        "Learn marketing, sales and business development techniques from the leaders in career counselling",
    },
  ];

  // Data for the "Steps" section
  const stepsData = [
    {
      step: "Step 1",
      description:
        "Join our career counselling community & certificate workshop",
    },
    {
      step: "Step 2",
      description: "Get career counselling certification & training",
    },
    {
      step: "Step 3",
      description: "Start your own career counselling center",
    },
  ];

  const credentialingBodiesData = [
    {
      src: "/assets/images/nccp/cn.svg",
      alt: "Career Naksha Logo",
    },
    {
      src: "/assets/images/nccp/iso.png",
      alt: "ISO Certified Logo",
    },
    {
      src: "/assets/images/nccp/msme.png",
      alt: "MSME Logo",
    },
    {
      src: "/assets/images/nccp/sin.png",
      alt: "Startup India Logo",
    },
    {
      src: "/assets/images/nccp/cci.png",
      alt: "Career Counselling India Logo",
    },
    {
      src: "/assets/images/nccp/nlcc.png",
      alt: "National Level Career Counselling Logo",
    },
  ];
  // Data for the "Who can join?" section
  const whoCanJoinData = [
    "Psychologists or Counsellors",
    "Career Counsellors",
    "Educationists & Academicians",
    "HR or Coaches",
    "Corporate Executives or Professionals",
    "Entrepreneurs",
    "Teachers or Principals",
    "Social Worker or NGO Professional",
  ];

  const trainersData = [
    {
      name: "Diwakar Singh Sikarwar",
      title: "CCI Founder, Trainer & Psychologist",
      imageSrc: "assets/images/nccp/t1.png",
      altText:
        "Professional headshot of Diwakar Singh Sikarwar, CCI Founder and Psychologist",
    },
    {
      name: "Nimish Gopal",
      title: "Founder & CEO",
      imageSrc: "assets/images/nccp/t2.png",
      altText: "Professional headshot of Nimish Gopal, the Founder and CEO",
    },
    {
      name: "Huma Sufiyan",
      title: "Head Community Manager & PM Shri Lead",
      imageSrc: "assets/images/nccp/t3.png",
      altText: "Professional headshot of Huma Sufiyan, Head Community Manager",
    },
    {
      name: "Tushar Karlekar",
      title: "President Execution",
      imageSrc: "assets/images/nccp/t4.png",
      altText:
        "Professional headshot of Tushar Karlekar, President of Execution",
    },
  ];

  const testimonials: Testimonial[] = [
    {
      _id: "1",
      tm_detail:
        "I work as a school counsellor, and my involvement with CareerNaksha began when I enrolled in their career coaching program. This course provided me with valuable insights into career counselling and enhanced my skills in conducting and analysing psychometric assessments. Consequently, I became a lifelong member of CareerNaksha. I am extremely satisfied with my association with CareerNaksha and intend to maintain this partnership for a long time.",
      tm_name: "Tanima Chatterjee",
      Image: "/assets/images/nccp/testi1.png",
      tm_expertise: "Counselling Psychologist",
      tm_rating: 5,
      // city: "Kolkata",
    },
    {
      _id: "2",
      tm_detail:
        "Hello, I'm Punya. A few months ago, I was in search of a career counselling course. During my search, I came across a course being offered by CCI and CareerNaksha. When I started attending the classes, I was pleasantly surprised by the quality of education provided by the instructors. I am truly grateful to the entire team for granting me this wonderful opportunity to participate in the course.",
      tm_name: "Punya Singhaniya",
      Image: "/assets/images/nccp/testi2.png",
      tm_expertise: "School Counsellor",
      tm_rating: 5,
      // city: "New Delhi",
    },

    {
      _id: "3",
      tm_detail:
        "My intention was to find an in-person program to enhance my career counselling skills, and CareerNaksha was recommended to me by a friend. The team at CareerNaksha conducted each session with great dedication, delivering valuable knowledge and information. I am delighted to have received a comprehensive set of study materials. I enthusiastically recommend the CareerNaksha team to anyone seeking career counselling courses.",
      tm_name: "Fameeda M.",
      Image: "/assets/images/nccp/testi3.png",
      tm_expertise: "Counselling Psychologist",
      tm_rating: 5,
      // city: "Thrissur, Kerala",
    },
    {
      _id: "4",
      tm_detail:
        "I was eager to enhance my skills in career counselling, and after conducting preliminary research, I found out about CareerNaksha. Training sessions were well-organized, extremely enlightening and filled with valuable knowledge and insight. Diwakar sir is an exceptional individual with extensive knowledge and experience. Moreover, Huma madam conducted several sessions and demonstrated her remarkable ability to connect with people. I confidently recommend CareerNaksha and CCI to anyone seeking a counsellor certification program.",
      tm_name: "Shyam Verma",
      Image: "/assets/images/nccp/testi4.png",
      tm_expertise: "School Counsellor",
      tm_rating: 5,
      // city: "Raipur",
    },
  ];

  const faqs: FAQ[] = [
    {
      question: "What is career counselling certification program?",
      answer: `National career counselling certification program is a training
              program for any individual who wants to learn and practice as a
              career counsellor. Independently start their own center or want to
              advance their skills/qualifications. CCI & CareerNaksha
              certificate in career counselling automatically gives you power to
              counsel students or professionals. It makes you eligible to
              practice with confidence alone or on a contract basis for a
              school/private educational institute or as an independent
              freelancer. It doesn’t matter if you are a professional or a
              graduate or a fresher, you should have zeal and eagerness to
              counsel your clients in the right direction. You can join NCCP to
              advance your career.`,
    },
    {
      question:
        "How can I become a career counsellor in India or Abroad? Do I need a psychology or a counselling degree is mandatory?",
      answer: `In India in order to become a career counsellor you just need a
              graduate degree in any field but that is the minimum. Psychology
              degree is not mandatory or necessary. You must be qualified enough
              with good certification or diploma career counselling programs.
              Willingness to help students or professionals is a necessary
              condition with inquisitiveness to learn and acquire knowledge
              related to widespread careers. National Career Counselling
              Certification program by CCI and CareerNaksha will equip you with
              the right tools & platform to practice best career counselling in
              your location. The training program is of 3 months online
              certification with 8 modules, having live lectures in evenings or
              weekends to give you flexibility.`,
    },
    {
      question:
        "Do you provide any freelance or business opportunities to a career counsellor?",
      answer: `Yes we regularly and actively hire or recruit new career
              counsellors for our large scale projects. We even provide one to
              one opportunities to our partner counsellors across India and
              around the world. The need of career counselling is very big hence
              we require not just hundreds of counsellors but thousands of
              counsellors to meet the growing demand. Apart from that a career
              counsellor can get jobs at various educational institutes, schools
              or even can start their own independent practice center online or
              offline`,
    },
    {
      question:
        "Are you eligible to counsel students or professionals on your own?",
      answer: `Yes you can immediately start counselling students after
              undergoing the training and certification program by CCI &
              CareerNaksha. There is immense opportunity of growth in India &
              around the world market.`,
    },
    {
      question: "What is the mode of training & certification?",
      answer: `Most of our sessions, workshops and lectures are live online mode
              but we occasionally do offline in multiple cities across India &
              Overseas. We provide recorded sessions, practical case studies,
              live module lectures and also continuous support from our
              community team. Goal is to make sure you have all necessary tools
              and experience to deliver on ground with clients.`,
    },
    {
      question:
        "Do we charge annually or recurring or one time? Any additional payment needed after training & certification?",
      answer: `These activities that we do for our partner or counsellors are
              one-time payment. We do not charge recurring for training or
              certification. There is no additional or renewal fees even to
              access our dashboard with psychometrics.`,
    },
  ];

  return (
    <>
      <section className="flex relative w-screen overflow-hidden mt-24 justify-center lg:mt-0">
        <div className="flex justify-between items-center w-full lg:flex-row flex-col lg:px-12 px-6">
          <div className="flex flex-col lg:w-2/5 items-center text-center gap-2 lg:items-start lg:text-left">
            <p className="text-smallheading text-lg lg:text-2xl font-bold">
              National Career Counsellors Community
            </p>
            <h1 className="lg:text-5xl lg:leading-[4rem] text-3xl font-bold text-blueprimary opacity-95">
              Counselling Certification Program for Counsellors
            </h1>
            <p className="lg:text-base text-sm font-bold mt-2 max-w-md">
              Triple Certification & Training Options Center Enablement &
              Business Expansion
            </p>
            <GetCertified />
          </div>
          <div className="py-8">
            <Image
              src="/assets/images/nccp/hero.png"
              alt="A group of career counsellors collaborating to help students and professionals."
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* growth */}
      <section className="w-full" aria-labelledby="stats-heading">
        <h2
          id="stats-heading"
          className="text-smallheading text-center font-bold text-base lg:text-2xl mt-12"
        >
          Largest Counsellors Community
        </h2>
        <h2 className="text-center font-bold text-blueprimary opacity-95 lg:text-[2.5rem] text-2xl px-6 mt-5">
          Be Among the Best Counsellors of Bharat
        </h2>
        <ul className="flex justify-center gap-12 px-6 flex-wrap mt-12">
          {statCardsData.map((card, index) => (
            <li
              key={index}
              className="border border-blue-600 rounded-lg relative w-52 overflow-hidden shadow-lg transition-shadow hover:shadow-xl"
            >
              <Image
                src={card.imageSrc}
                alt={card.altText}
                width={208}
                height={208}
                className="w-full"
              />
              <div className="text-sm text-white font-bold absolute bottom-0 left-0 p-2 bg-black/50 w-full h-full flex items-end">
                <p>{card.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* New Growth Section */}
      <section className="w-full mt-20" aria-labelledby="growth-heading">
        <h2
          id="growth-heading"
          className="text-smallheading text-center font-bold text-base lg:text-2xl"
        >
          Stats
        </h2>
        <h2 className="w-screen text-center font-bold text-blueprimary opacity-95 lg:text-[2.5rem] text-2xl px-6 mt-5">
          Growth Opportunities
        </h2>

        {/* Growth Timeline */}
        <div className="w-screen flex justify-center mt-12 px-6">
          <ul className="max-w-5xl flex gap-6 w-full">
            <div className="flex flex-col items-center">
              {growthTimelineData.map((item, index) => (
                <Fragment key={index}>
                  <li className="font-bold flex justify-center items-center h-12 w-12 rounded-full border border-blue-600 text-blue-600">
                    {item.value}
                  </li>
                  {index < growthTimelineData.length - 1 && (
                    // Using a div with CSS for the line instead of an image
                    <div className="w-1 h-12 bg-blue-600 my-1"></div>
                  )}
                </Fragment>
              ))}
            </div>
            <div className="h-full flex flex-col justify-between py-2.5">
              {growthTimelineData.map((item, index) => (
                <li key={index} className="font-bold text-gray-800">
                  {item.description}
                </li>
              ))}
            </div>
          </ul>
        </div>

        {/* Growth Opportunity Cards */}
        <ul className="flex w-screen justify-center px-6 gap-14 mt-20 flex-wrap">
          {growthOpportunityData.map((card, index) => (
            <li
              key={index}
              className="rounded-lg border border-blue-600 flex gap-5 items-center py-6 px-5 h-full max-w-xs relative shadow-md transition-shadow hover:shadow-lg"
            >
              <div
                className="min-w-[3.5rem] h-14 rounded-full flex justify-center items-center font-extrabold text-white"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(135deg, #4371fa 0%, #00d2ff 100%)"
                      : index === 1
                      ? "linear-gradient(135deg, #102FB1 0%, #204AF5 100%)"
                      : "linear-gradient(135deg, #5136D9 0%, #9C66F9 100%)",
                }}
              >
                {card.percentage}
              </div>
              <p>{card.description}</p>
              <div className="absolute -top-8 -left-8 h-16 w-16 p-4 flex justify-center items-center rounded-full border border-blue-600 bg-white shadow-md">
                <Image
                  src={card.imageSrc}
                  alt={card.altText}
                  width={64}
                  height={64}
                  className="w-full"
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="w-full" aria-labelledby="why-heading">
        <h2
          id="why-heading"
          className="w-screen text-center font-bold text-base lg:text-2xl mt-20"
        >
          Why?
        </h2>
        <h2 className="w-screen text-center font-bold text-blue-600 lg:text-[2.5rem] text-2xl px-6 mt-5">
          Why Enroll in Career Counsellors Program
        </h2>
        <div className="w-screen flex justify-center mt-12 px-6">
          <ul className="max-w-6xl w-full flex justify-center gap-14 flex-wrap h-max">
            {whyCardsData.map((card, index) => (
              <li
                key={index}
                className="rounded-lg border border-gray-300 py-8 px-5 flex flex-col gap-2 max-w-xs h-[16rem] hover:border-blue-600 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-16 w-16 rounded-full bg-white flex justify-center items-center shadow-md p-2">
                  <Image
                    src={card.imageSrc}
                    alt={card.altText}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="font-bold mt-2 group-hover:text-blue-600 transition-all duration-300">
                  {card.title}
                </h3>
                <p className="text-sm">{card.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* "Steps to become Counsellorpreneur" Section */}
      <section
        className="w-full flex justify-center mt-20 bg-gray-100 py-14 px-6"
        aria-labelledby="steps-heading"
      >
        <div className="max-w-6xl flex flex-col items-center">
          <h2 id="steps-heading" className="font-bold text-base lg:text-2xl">
            Steps to become Counsellorpreneur
          </h2>
          <p className="font-bold text-blue-600 lg:text-[2.5rem] text-2xl mt-5 text-center">
            To reach your career goals as a career counsellor
          </p>
          <div className="flex flex-col lg:flex-row items-center mt-16 w-full lg:gap-12">
            <div className="flex items-center w-full justify-between lg:justify-center">
              {stepsData.map((step, index) => (
                <Fragment key={index}>
                  <div className="rounded-3xl bg-white flex justify-center items-center h-12 w-24 text-blue-600 font-bold text-sm lg:h-16 lg:w-32 lg:text-base shadow-md">
                    {step.step}
                  </div>
                  {index < stepsData.length - 1 && (
                    <div className="flex-grow flex justify-center">
                      <Image
                        src="/assets/images/nccp/arrow.png"
                        alt="An arrow indicating the next step"
                        width={100}
                        height={16}
                        className="w-20 lg:w-40 h-auto rotate-90 lg:rotate-0"
                      />
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
          <ul className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-6 justify-center w-full">
            {stepsData.map((step, index) => (
              <li
                key={index}
                className="max-w-xs font-semibold text-center text-sm lg:text-base"
              >
                {step.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="w-full" aria-labelledby="who-heading">
        <h2
          id="who-heading"
          className="w-screen text-center font-bold text-blue-600 lg:text-[2.5rem] text-2xl px-6 mt-16"
        >
          Who can join?
        </h2>
        <div className="w-screen flex justify-center">
          <div className="max-w-6xl flex justify-between gap-8 items-center w-full flex-col lg:flex-row">
            <ul className="flex flex-col gap-3 lg:ml-32 mt-8 lg:mt-0 font-semibold">
              {whoCanJoinData.map((item, index) => (
                <li key={index} className="flex gap-2">
                  <span className="min-w-[1rem] w-[1rem] relative top-1">
                    <Image
                      src="/assets/images/nccp/check.png"
                      alt="A checkmark icon"
                      width={16}
                      height={16}
                    />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="lg:h-[28rem] lg:ml-32 w-full lg:w-auto">
              <Image
                src="/assets/images/nccp/who.png"
                alt="Illustration of different people who can join the program"
                width={400}
                height={500}
                className="h-full w-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------- Differentiation Section -------------------- */}
      <section className="w-full" aria-labelledby="differentiation-heading">
        <h2
          id="differentiation-heading"
          className="w-screen text-center font-bold text-base lg:text-2xl mt-20"
        >
          Differentiation
        </h2>
        <h2 className="w-screen text-center font-bold text-blue-600 lg:text-[2.5rem] text-2xl px-6 mt-5">
          Why Choose NCCP over others
        </h2>
        <Image
          src="/assets/images/nccp/chart.png"
          alt="A comparison chart showing why NCCP is better than others"
          width={800}
          height={400}
          className="w-8/12 block mx-auto"
        />
      </section>

      {/* -------------------- Credentialing Bodies Section -------------------- */}
      <section className="w-full" aria-labelledby="credentialing-heading">
        <h2
          id="credentialing-heading"
          className="w-screen text-center font-bold text-blue-600 lg:text-[2.5rem] text-2xl px-6 mt-20"
        >
          Credentialing Bodies
        </h2>
        <ul className="w-screen flex justify-center gap-12 px-6 items-center mt-14 flex-wrap">
          {credentialingBodiesData.map((body, index) => (
            <li key={index}>
              <Image src={body.src} alt={body.alt} width={150} height={50} />
            </li>
          ))}
        </ul>
      </section>

      <LevelsOfNCCP />

      <KnowMore />

      {/* Trainers Section */}
      <section aria-labelledby="trainers-heading">
        <h2
          id="trainers-heading"
          className="w-screen text-center font-bold text-base lg:text-2xl mt-20"
        >
          Meet Our Trainers
        </h2>
        <h2 className="w-screen text-center font-bold text-blue-600 lg:text-[2.5rem] text-2xl px-6 mt-5">
          Your Trainer through-out this Program
        </h2>
      </section>

      <section className="w-screen flex justify-center mt-12 px-6">
        <div className="max-w-6xl w-full">
          {/* An h2 tag provides a clear, hierarchical heading for the section,
        which is critical for search engine crawlers. */}
          <h2 className="text-3xl font-bold text-center mb-10">
            Meet Our Expert Trainers
          </h2>

          <div className="flex justify-center gap-8 flex-wrap">
            {trainersData.map((trainer, index) => (
              // The <figure> and <figcaption> tags semantically group the image and its caption.
              <figure
                key={index}
                className="lg:w-48 w-36 h-[13rem] flex flex-col items-center rounded-2xl border border-gray-300 cursor-pointer hover:border-blue-600 hover:shadow-[0_8px_18px_rgba(66,129,253,0.15)] transition-all duration-300 group text-center px-4 justify-between py-4"
              >
                {/* Avatar Container */}
                <div className="avatar">
                  <div className="lg:w-20 w-16 rounded-full border border-gray-300 group-hover:border-blue-600 transition-all duration-300">
                    {/* The 'alt' attribute is crucial for accessibility and image SEO.
                  It provides a descriptive text for search engines and screen readers. */}
                    <img
                      src={trainer.imageSrc}
                      alt={trainer.altText}
                      className="rounded-full w-full h-full object-cover"
                    />
                  </div>
                </div>

                <figcaption className="flex flex-col justify-center mt-4">
                  {/* The h3 tag provides a logical subheading for each trainer's name. */}
                  <h3 className="font-bold text-sm">{trainer.name}</h3>
                  <p className="text-gray-500 font-semibold lg:text-sm text-xs mt-1 group-hover:text-blue-600 transition-all duration-300">
                    {trainer.title}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* testimonials */}
      <section aria-labelledby="testimonials-heading">
        <h2
          id="trainers-heading"
          className="w-screen text-center font-bold text-base lg:text-2xl mt-20"
        >
          Testimonials
        </h2>
        <h2 className="w-screen text-center font-bold text-blue-600 lg:text-[2.5rem] text-2xl px-6 mt-5">
          Don't Listen to us, Hear from our Counsellors
        </h2>

        <Testimonials
          testimonials={testimonials}
          cardsToShow={3}
          gap={10}
          showNavigation={false}
          showControlsOnHover
          className="w-10/12 mx-auto mt-10"
        />
      </section>

      {/* Faqs */}
      <FAQs
        title="FAQs"
        subtitle="Some Common Questions Asked by Counsellors"
        faqs={faqs}
        bannerImage="/assets/images/nccp/faq.svg"
      />
    </>
  );
}
