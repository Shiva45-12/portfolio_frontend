// ============================================
// PERSONAL DATA
// ============================================

export const personalInfo = {
  name: "Shiva",
  title: "Full Stack Developer",
  tagline: "Building exceptional digital experiences",
  bio: "I'm a passionate full-stack developer who loves crafting beautiful, functional, and user-centric web applications. I specialize in React, Node.js, and modern web technologies. When I'm not coding, you'll find me exploring new technologies, contributing to open source, or enjoying a good cup of coffee.",
  email: "sv575014@email.com",
  phone: "+91 8112580707",
  location: "India",
  available: true,
  avatar: "/SHIVA.png",
  logo: "/SHIVA.png",
};

export const socialLinks = {
  github: "https://github.com/Shiva45-12",
  linkedin: "https://www.linkedin.com/in/shiva-vishwakarma-b13888308/",
  twitter: "https://x.com/ShivaVishw45301",
  instagram: "https://www.instagram.com/ram__bhakt_shiva_vishwakarma45/",
};

export const navigation = [
  { name: "Home",       href: "#home" },
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Projects",   href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact",    href: "#contact" },
];

export const skills = {
  frontend: [
    { name: "React",        level: 85 },
    { name: "Express js",   level: 85 },
    { name: "Node js",   level: 85 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Java Script",       level: 72 },
    { name: "Bootstrap",       level: 82 },
    { name: "AOS",       level: 82 },
    { name: "JQuery",       level: 62 },
    { name: "Redux",       level: 62 },
  ],
  backend: [
    { name: "Node.js",    level: 90 },
    { name: "MongoDB",    level: 85 },

  ],
  tools: [
    { name: "Git",    level: 95 },
    { name: "Github", level: 78 },
    { name: "Hostinger",  level: 72 },
    { name: "Canva",  level: 80 },
    { name: "AI Tools",  level: 85 },
    { name: "Godaddy",  level: 85 },
    { name: "ChatGPT",  level: 95 },
  ],
  softSkills: [
    "Problem Solving",
    "Team Leadership",
    "Agile / Scrum",
    "Technical Writing",
    "Mentoring",
    "Communication",
  ],
};

export const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform with real-time inventory management, secure payment processing, and an admin dashboard for analytics.",
    image: "https://res.cloudinary.com/drtwauc7d/image/upload/v1774518295/glassecommerce_products/lwjqjlcjfp7hyaat24wk.png",
    tech: ["React", "Node.js", "Express js", "JS", "Redux"],
    live: "https://www.espejo.in/",
    github: "https://github.com/digicoders-git/espejo_website.git",
    featured: true,
  },
  {
    id: 2,
    title: "Aluzen",
    description: "Precision-crafted aluminium solutions for modern architecture.",
    image: "https://aluzen-website-eta.vercel.app/ab4.jpg",
    tech: ["Next.js", "Express js", "React js", "Vercel"],
    live: "https://aluzen-website-eta.vercel.app/",
    github: "https://github.com/digicoders-git/Aluzen_Website.git",
    featured: true,
  },
  {
    id: 3,
    title: "Labo India",
    description: "Improve diagnostic awareness, transparency, and connectivity across healthcare stakeholders with our unified pathology laboratory network.",
    image: "https://res.cloudinary.com/drwss54l2/image/upload/v1773459402/inventory_panel_profiles/poutuvhsl9gy9mhmgzuw.jpg",
    tech: ["React", "Node js", "Express", "MongoDB"],
    live: "https://www.laboindia.com/",
    github: "https://github.com/digicoders-git/PATHOLOGY_WEBSITE.git",
    featured: false,
  },
  {
    id: 4,
    title: "Unixa Water Purifier E-Commerce",
    description: "At UNIXA Water Technologies, purity is not just a promise — it’s a legacy crafted through innovation, precision, and trust. Guided by our belief 'A TRUE PROTECTOR OF YOUR FAMILY.",
    image: "https://unixa-website.vercel.app/assets/mhImage-Cbn6eWrC.png",
    tech: ["React js", "Redux", "Node.js" , "Express js" , "Mongo DB"],
    live: "https://unixa-website.vercel.app/",
    github: "https://github.com/digicoders-git/UNIXA_WEBSITE.git",
    featured: false,
  },
  {
    id: 5,
    title: "Real Estate Portal",
    description: "A modern real estate listing platform with advanced search filters, virtual tours, and mortgage calculator.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    tech: ["Next.js", "Tailwind CSS", "Express", "Mongo DB"],
    live: "https://sp-city-web.onrender.com/",
    github: "https://github.com/digicoders-git/spcity_website.git",
    featured: true,
  },
  {
    id: 6,
    title: "Kara Group Of Company",
    description: "Building India's Sustainable Future Through Solar & Micro Industries.",
    image: "https://kara-frontend.onrender.com/assets/images/home01/people-working-img-2.jpg",
    tech: ["React", "Express js", "REST API", "Mongo DB"],
    live: "https://kara-frontend.onrender.com/",
    github: "https://github.com/digicoders-git/solarkaraNew.git",
    featured: false,
  },
];

export const experience = [
  {
    id: 1,
    company: "DigiCoders Technologies pvt. ltd.",
    role: " Full Stack Developer",
    duration: "July 2025 - Present",
    description: "Leading development of enterprise SaaS products, mentoring junior developers, and architecting scalable microservices solutions. Improved system performance by 40% through strategic optimizations.",
    technologies: ["React", "Node.js", "AWS", "Express js" , "Mongodb" , "REST APIs"],
    type: "full-time",
  },
  
];

export const education = [
  {
    id: 1,
    institution: "GPS Kanpur Dehat UP",
    degree: "Diploma in Computer Science & Engineering",
    duration: "2024 - 2025",
    description: "Specialized in Software Engineering and Distributed Systems. Active member of coding club and hackathon teams.",
  },
  {
    id: 2,
    institution: "Online Certifications",
    degree: "Full Stack Web Development",
    duration: "2025 - 2026",
    description: "Completed intensive full-stack bootcamp covering React, Node.js, databases, and Web Development.",
  },
];

export const stats = [
  { value: "1+",  label: "Years Experience" },
  { value: "30+", label: "Projects Completed" },
  { value: "30+", label: "Happy Clients" },
  { value: "10+", label: "Open Source Contributions" },
];

export const certifications = [
  "Coders War 3.0",
  "Apprenticeship Training",
  "Summer Training",
  "React Developer",
];
