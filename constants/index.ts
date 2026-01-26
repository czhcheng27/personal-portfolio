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
  threejs,
  github,
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
  borderColor?: string;
};

const expCards: ExpCard[] = [
  {
    review1:
      "This experience significantly advanced expertise in responsive layout, performance optimization, and SEO on ToC-facing applications.",
    review2:
      "It also deepened understanding of system architecture through routing design, role-based permissions, and access management.",
    imgPath: "/assets/company/exp1.png",
    logoPath: "/assets/company/logo1.png",
    title: "Frontend Developer",
    date: "June 2025 - Present",
    responsibilities: [
      "Independently refactored the company's public website and subdomains, implementing fully responsive layouts and optimizing performance, reducing page load time from 3.5s to 70ms (≈80% improvement).",
      "Processed long-form videos into segments and integrated CloudFront CDN acceleration, significantly improving playback performance and eliminating loading lag.",
      "Rebuilt internal B2B systems including user management, role-based permissions, button-level access control, and route guards, enhancing security, maintainability, and workflow efficiency.",
    ],
    borderColor: "#fd5c79",
  },
  {
    review1:
      "During this period, the role evolved from individual contributor to frontend team lead, guiding the team through complex projects while expanding both the breadth and depth of technical expertise.",
    review2:
      "This transition fostered a stronger focus on solving challenging technical problems, with increased attention to architecture, design, and system-level thinking.",
    review3:
      "Emphasis was placed on writing maintainable, scalable, and readable code, ensuring high quality and long-term extensibility across projects.",
    imgPath: "/assets/company/exp2.png",
    logoPath: "/assets/company/logo2.png",
    title: "Frontend Developer",
    date: "December 2021 - November 2024",
    responsibilities: [
      "Developed a configurable advanced search module with dynamic AND/OR filters and field-specific match types, enabling scalable future expansion and reducing integration time by 80%.",
      "Built a modular drag-and-drop editor for structured documents using Redux and DnD, supporting tables, images, formulas, validation, and dynamic clause numbering—commercialized as the first of its kind in China.",
      "Created a unified chart configuration system with ECharts, HighCharts, and Three.js, reducing development time by 40% through reusable, standardized visual components.",
      "Refactored and encapsulated UI components and icon/font libraries into a reusable system, standardizing design and reducing code duplication across multiple projects",
    ],
    borderColor: "#3b82f6",
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
    borderColor: "#6d45ce",
  },
];

const techStackIcons = [
  {
    name: "React",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Tailwind",
    modelPath: "/models/tailwind.glb",
    scale: 1.5,
    rotation: [0, 0, 0],
  },
  {
    name: "Typescript",
    modelPath: "/models/ts.glb",
    scale: 1.5,
    rotation: [0, 0, 0],
  },
  {
    name: "Javascript",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Threejs",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Git",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
] as const;

export type TechIcon = (typeof techStackIcons)[number];

const projects = [
  {
    id: 1,
    title: "3D Solar System Planets to Explore",
    des: "Explore the wonders of our solar system with this captivating 3D simulation of the planets using Three.js.",
    img: "/assets/bg/p1.svg",
    iconLists: [
      "/assets/icons/re.svg",
      "/assets/icons/tail.svg",
      "/assets/icons/ts.svg",
      "/assets/icons/three.svg",
      "/assets/icons/fm.svg",
    ],
    link: "/ui.earth.com",
    github: "github.com/",
  },
  {
    id: 2,
    title: "Yoom - Video Conferencing App",
    des: "Simplify your video conferencing experience with Yoom. Seamlessly connect with colleagues and friends.",
    img: "/assets/bg/p2.svg",
    iconLists: [
      "/assets/icons/next.svg",
      "/assets/icons/tail.svg",
      "/assets/icons/ts.svg",
      "/assets/icons/stream.svg",
      "/assets/icons/c.svg",
    ],
    link: "/ui.yoom.com",
    github: "github.com/",
  },
  {
    id: 3,
    title: "AI Image SaaS - Canva Application",
    des: "A REAL Software-as-a-Service app with AI features and a payments and credits system using the latest tech stack.",
    img: "/assets/bg/p3.svg",
    iconLists: [
      "/assets/icons/re.svg",
      "/assets/icons/tail.svg",
      "/assets/icons/ts.svg",
      "/assets/icons/three.svg",
      "/assets/icons/c.svg",
    ],
    link: "/ui.aiimg.com",
    github: "github.com/",
  },
  {
    id: 4,
    title: "Animated Apple Iphone 3D Website",
    des: "Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..",
    img: "/assets/bg/p4.svg",
    iconLists: [
      "/assets/icons/next.svg",
      "/assets/icons/tail.svg",
      "/assets/icons/ts.svg",
      "/assets/icons/three.svg",
      "/assets/icons/gsap.svg",
    ],
    link: "/ui.apple.com",
    github: "github.com/",
  },
];

export { services, technologies, expCards, techStackIcons, projects };
