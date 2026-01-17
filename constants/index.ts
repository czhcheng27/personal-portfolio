import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
} from "../public/assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

export type ExpCard = {
  review1: string;
  review2?: string;
  review3?: string;
  review4?: string;
  imgPath: string;
  logoPath: string;
  title: string;
  date: string;
  responsibilities: string[];
};

const expCards: ExpCard[] = [
  {
    review1: "This experience significantly advanced expertise in responsive layout, performance optimization, and SEO on ToC-facing applications.",
    review2: "It also deepened understanding of system architecture through routing design, role-based permissions, and access management.",
    imgPath: "/assets/company/exp1.png",
    logoPath: "/assets/company/logo1.png",
    title: "Frontend Developer",
    date: "June 2025 - Present",
    responsibilities: [
      "Independently refactored the company’s public website and subdomains, implementing fully responsive layouts and optimizing performance, reducing page load time from 3.5s to 70ms (≈80% improvement).",
      "Processed long-form videos into segments and integrated CloudFront CDN acceleration, significantly improving playback performance and eliminating loading lag.",
      "Rebuilt internal B2B systems including user management, role-based permissions, button-level access control, and route guards, enhancing security, maintainability, and workflow efficiency.",
    ],
  },
  {
    review1:"During this period, the role evolved from individual contributor to frontend team lead, guiding the team through complex projects while expanding both the breadth and depth of technical expertise.",
    review2: "This transition fostered a stronger focus on solving challenging technical problems, with increased attention to architecture, design, and system-level thinking.",
    review3: "Emphasis was placed on writing maintainable, scalable, and readable code, ensuring high quality and long-term extensibility across projects.",
    imgPath: "/assets/company/exp2.png",
    logoPath: "/assets/company/logo2.png",
    title: "Frontend Developer",
    date: "February 2022 - January 2025",
    responsibilities: [
      "Developed a configurable advanced search module with dynamic AND/OR filters and field-specific match types, enabling scalable future expansion and reducing integration time by 80%.",
      "Built a modular drag-and-drop editor for structured documents using Redux and DnD, supporting tables, images, formulas, validation, and dynamic clause numbering—commercialized as the first of its kind in China.",
      "Created a unified chart configuration system with ECharts, HighCharts, and Three.js, reducing development time by 40% through reusable, standardized visual components.",
      "Refactored and encapsulated UI components and icon/font libraries into a reusable system, standardizing design and reducing code duplication across multiple projects"
    ],
  },
  {
    review1:
      "Gained hands-on experience with CMS platforms and real-world production code, while building a strong foundation in frontend fundamentals and code quality.",
    imgPath: "/assets/company/exp3.png",
    logoPath: "/assets/company/logo3.png",
    title: "Web Developer",
    date: "May 2018 - Nov 2021",
    responsibilities: [
      "Extended and customized WooCommerce plugins to support province-based shipping fee logic, ensuring accurate pricing during checkout.",
      "Implemented multi-criteria product filtering (price, brand, category, attributes) using WordPress plugins to improve product discovery.",
      "Customized and optimized the WooCommerce product listing and checkout flow, integrating third-party plugins to meet business requirements and improve user experience.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, expCards, testimonials, projects };
