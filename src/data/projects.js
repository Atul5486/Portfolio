import genWeb1 from "../assets/GenWeb1.png";
import genWeb2 from "../assets/GenWeb2.png";
import genWeb3 from "../assets/GenWeb3.png";
import genWeb4 from "../assets/GenWeb4.png";
import uber from "../assets/uber.png";
import uber1 from "../assets/uber1.png";
import uber2 from "../assets/uber2.png";
import uber3 from "../assets/uber3.png";
import chat1 from "../assets/img1.JPG";
import chat2 from "../assets/img2.JPG";
import chat3 from "../assets/img3.JPG";
import chat4 from "../assets/photo1.JPG";

export const projects = [
  {
    slug: "genweb-ai",
    title: "GenWeb AI",
    shortTitle: "GenWeb AI",
    role: "AI-powered web assistant and landing experience",
    description:
      "GenWeb AI is a modern landing experience designed to present AI-driven web solutions in a clear, polished way. The concept focuses on sharp visuals, high-contrast sections, and a premium presentation style that makes the product feel more like a launch page than a static portfolio card.",
    details:
      "The page structure highlights the core value proposition first, then supports it with supporting visuals and a strong call to action. It is built to be responsive, so the layout stays readable and visually balanced on desktop and mobile.",
    challenge:
      "The main challenge was balancing a bold visual language with usability, so the interface still feels easy to scan while keeping the design energetic.",
    solution:
      "That was handled by using layered sections, consistent spacing, and a clean image hierarchy that keeps attention on the primary message.",
    images: [genWeb1, genWeb2, genWeb3, genWeb4],
    accent: "#291C29",
    tags: ["MERN", "GSAP", "Framer Motion"],
  },
  {
    slug: "uber-clone",
    title: "Uber Clone",
    shortTitle: "Uber Clone",
    role: "Ride booking interface inspired by Uber",
    description:
      "Uber Clone is a ride-booking interface that focuses on quick interactions, clear hierarchy, and a familiar transportation workflow. The design is centered on speed, with a layout that keeps the booking flow simple and approachable.",
    details:
      "The project presentation uses a strong accent color, concise section copy, and route-focused visuals to communicate the idea quickly. The goal is to show a usable product direction instead of just a mockup collage.",
    challenge:
      "The biggest challenge was keeping the interface visually rich without making the booking flow feel crowded or confusing.",
    solution:
      "The solution was to use a compact visual system, a strong color palette, and clean spacing so the experience stays fast to understand.",
    images: [uber, uber1, uber2, uber3],
    accent: "#dc9317",
    tags: ["MERN", "GSAP", "Framer Motion"],
  },
  {
    slug: "chat-app",
    title: "Chat App",
    shortTitle: "Chat App",
    role: "Real-time messaging interface concept",
    description:
      "Chat App is a communication interface built around fast message reading, a tidy conversation layout, and a friendly visual style. It is intended to feel lightweight while still looking polished enough for a product demo.",
    details:
      "The page uses a split visual structure so the conversation area remains the focus while supporting information stays nearby. This makes the experience feel more like a real messaging product and less like a generic portfolio slide.",
    challenge:
      "The challenge here was to make the interface feel active and modern while still leaving enough visual breathing room for long conversations.",
    solution:
      "That was solved through strong alignment, readable typography, and a balanced image set that keeps the interface dynamic.",
    images: [chat1, chat2, chat3, chat4],
    accent: "#3884d3",
    tags: ["MERN", "GSAP", "Framer Motion"],
  },
];

export const getProjectBySlug = (slug) =>
  projects.find((project) => project.slug === slug);