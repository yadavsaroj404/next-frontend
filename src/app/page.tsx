import HomeComponent from "@/components/pages/Home";
import { ImpactNumbers, userCategories, whyChooseUsCards } from "@/data/utils";

async function fetchTestimonials() {
  // This function should fetch testimonials from an API or database
  return [
    {
      _id: "1",
      tm_detail:
        "“CareerNaksha’s guidance literally transformed my future—I landed my dream job in tech!”",
      Image: "https://i.pravatar.cc/48?img=1",
      tm_name: "Alice Johnson",
      tm_expertise: "Software Engineer",
    },
    {
      _id: "2",
      tm_detail:
        "“The psychometric test opened my eyes to strengths I never knew I had. Highly recommended.”",
      Image: "https://i.pravatar.cc/48?img=2",
      tm_name: "Rahul Mehta",
      tm_expertise: "Data Analyst",
    },
    {
      _id: "3",
      tm_detail:
        "“The personalized counselling was spot‑on. I feel confident about my career path now.”",
      Image: "https://i.pravatar.cc/48?img=3",
      tm_name: "Maria Garcia",
      tm_expertise: "Marketing Manager",
    },
    {
      _id: "4",
      tm_detail:
        "“Money‑back guarantee gave me the courage to try—and I’m so glad I did!”",
      Image: "https://i.pravatar.cc/48?img=4",
      tm_name: "Liam Smith",
      tm_expertise: "Student",
    },
    {
      _id: "5",
      tm_detail:
        "“The V‑Coach is like having a mentor in your pocket. Love the instant support.”",
      Image: "https://i.pravatar.cc/48?img=5",
      tm_name: "Sophie Dubois",
      tm_expertise: "Graphic Designer",
    },
  ];
  // const url = "https://dashboard.careernaksha.com/testimonials";

  // try {
  //   const response = await fetch(url);
  //   const data = await response.json();

  //   const testimonials = data.map((testimonial: any) => ({
  //     image: testimonial.Image,
  //     link: testimonial.link || "#",
  //     altText: testimonial.altText || "Testimonial image",
  //     ...testimonial,
  //   }));
  //   return testimonials;
  // } catch (error) {
  //   console.error("Error fetching testimonials:", error);
  //   return [];
  // }
}
export default async function Home() {
  const testimonials = await fetchTestimonials();

  return (
    <HomeComponent
      userCategories={userCategories}
      impactNumbers={ImpactNumbers}
      testimonials={testimonials}
      careerGurus={[]}
      blogs={[]}
      whyChooseUsCards={whyChooseUsCards}
    />
  );
}
