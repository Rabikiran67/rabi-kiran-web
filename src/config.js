
// src/config.js

// --- IMPORTS FOR SKILLS (Add new ones) ---
import React from 'react';
import {
  DiPython, DiJava, DiJavascript1, DiReact, DiNodejsSmall, DiMongodb, DiGit, DiVisualstudio, DiDocker, DiHtml5, DiCss3
} from 'react-icons/di';
import {
  SiExpress, SiSpringboot, SiMysql, SiRedux, SiReactrouter, SiTailwindcss, SiOpencv, SiPandas, SiNumpy,
  SiIntellijidea, SiRender, SiVercel, SiPostman, SiJira
} from 'react-icons/si';
import { FaBrain, FaGithub, FaLinkedin, FaInstagram, FaFacebookF, FaEnvelope, FaTwitter } from 'react-icons/fa';

// --- PERSONAL INFORMATION ---
export const personalInfo = {
  name: "M RABI KIRAN",
  initials: "{RK}", // For the new logo
  title: "Software Developer",
  titles: [
    "Full Stack Developer",
    "Open Source Contributor",
    "Problem Solver",
    "Tech Enthusiast",
    "Gamer",
    "Traveller",

  ],
  bio: "Full-Stack Developer based in Berhampur, Odisha, India. Experienced in building robust, scalable web applications with a focus on the MERN stack and machine learning. Passionate about solving real-world problems and delivering impactful solutions.",
  email: "rabikiran0406@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/Rabikiran67", icon: FaGithub },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/rabi-kiran-824881239/", icon: FaLinkedin },
    { name: "Instagram", url: "https://www.instagram.com/gipsy.exe/", icon: FaInstagram },
  ],
  phone: "8456866626",
  location: "Berhampur, Odisha, IN",
  resume: "/resume.pdf", // Path to your resume in the 'public' folder
  avatar: "/avatar.png", // <-- Added avatar path
  githubRepo: "https://github.com/Rabikiran67/rabi-kiran-web"
};

// --- SKILLS & TOOLS ---
// Replace the old `professionalSkills` and `tools` arrays with these three new arrays.

export const professionalSkills = [
  // Programming Languages
  { name: 'Python', icon: DiPython },
  { name: 'Java', icon: DiJava },
  { name: 'JavaScript', icon: DiJavascript1 },
  // Frameworks & Libraries
  { name: 'React.js', icon: DiReact },
  { name: 'Redux', icon: SiRedux },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Node.js', icon: DiNodejsSmall },
  { name: 'Express.js', icon: SiExpress },
  // Databases & DevOps
  { name: 'MongoDB', icon: DiMongodb },
  { name: 'Docker', icon: DiDocker },
  { name: 'Git', icon: DiGit },
  { name: 'GitHub', icon: FaGithub },
];


export const mlAiSkills = [
  { name: 'NLP', icon: FaBrain }, // Using a generic 'brain' icon for NLP
  { name: 'OpenCV', icon: SiOpencv },
  { name: 'Pandas', icon: SiPandas },
  { name: 'NumPy', icon: SiNumpy },
];

export const tools = [
  { name: 'VS Code', icon: DiVisualstudio  },
  { name: 'IntelliJ IDEA', icon: SiIntellijidea },
  { name: 'Render', icon: SiRender },
  { name: 'Vercel', icon: SiVercel },
  { name: 'Postman', icon: SiPostman },
  { name: 'JIRA', icon: SiJira },
];

// --- PROJECTS ---
// Add your project data here. For the modal, include a `details` property with more content.
export const projects = [
  {
    title: 'Learnify – MERN Stack Online Learning Platform',
    description: 'A comprehensive, full-stack online learning platform built using the MERN stack (MongoDB, Express, React, Node.js). Learnify provides a powerful role-based system for Students, Instructors, and Administrators to deliver and consume educational content.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center',
    tags: ['React + Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Passport.js', 'Cloudinary'],
    liveUrl: 'https://learnify-three-black.vercel.app/',
    githubUrl: 'https://github.com/Rabikiran67/Learnify',
    details: `
      ### Overview
      Learnify is a robust online learning platform with role-based access for Students, Instructors, and Admins. It enables content delivery, course management, and user engagement at scale.

      ### Key Features
      - **Role-Based System:** Separate dashboards and permissions for Students, Instructors, and Admins.
      - **Course Management:** Create, update, and enroll in courses.
      - **Interactive Content:** Video, quizzes, and assignments.
      - **Secure Authentication:** JWT-based login and registration.
      - **Responsive UI:** Modern, mobile-friendly design.

      ### License
      MIT
    `
  },
  {
    title: 'ByteEat - Smart Restaurant Ordering',
    description: 'A modern web application designed to streamline the restaurant ordering process. Users can scan a QR code (simulated), browse the menu, customize their items, add them to a cart, and proceed through a simulated checkout and payment process.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=800&fit=crop&crop=center',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'ShadCN UI', 'Genkit', 'Lucide React'],
    liveUrl: 'https://byte-eat.vercel.app/',
    githubUrl: 'https://github.com/Rabikiran67/ByteEat',
    details: `
      ### Overview
      ByteEat is a smart restaurant ordering platform with a seamless digital menu and checkout experience.

      ### Key Features
      - **QR Code Menu:** Scan to view and order.
      - **Customizable Orders:** Add/remove ingredients, special requests.
      - **Cart & Checkout:** Simulated payment flow.
      - **Admin Dashboard:** Manage menu and orders.
    `
  },
  {
    title: 'TicketRaisingPlatform – MERN Stack Issue Tracker',
    description: 'A full-stack issue management system built with MongoDB, Express.js, React.js, and Node.js. It enables seamless ticket handling through a role-based structure for Users, Support Staff, and Admins, featuring real-time updates, status tracking, and priority tagging.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&crop=center',
    tags: ['MERN', 'Issue Tracker', 'Role-Based', 'Real-Time'],
    liveUrl: 'https://ticket-raising-platform-jinv.vercel.app/',
    githubUrl: 'https://github.com/Rabikiran67/Ticket-Raising-Platform',
    details: `
      ### Overview
      TicketRaisingPlatform is a MERN stack issue tracker with real-time updates and a robust role-based system.

      ### Key Features
      - **Role-Based Access:** Users, Support Staff, Admins.
      - **Real-Time Updates:** Status and priority tracking.
      - **Notifications:** Email and in-app alerts.
    `
  },
  {
    title: 'IMDB Sentiment Analysis',
    description: 'A complete sentiment analysis pipeline using IMDB movie reviews. This project combines lexicon-based (VADER) and machine learning (Logistic Regression + TF-IDF) approaches, visualizes data, and provides a user-friendly web UI using Streamlit.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center',
    tags: ['Python', 'NLP', 'Machine Learning', 'Streamlit', 'VADER', 'Logistic Regression'],
    liveUrl: '',
    githubUrl: 'https://github.com/Rabikiran67/IMDB-Sentiment-Analysis',
    details: `
      ### Overview
      Sentiment analysis pipeline for IMDB reviews using both lexicon-based and ML approaches.

      ### Key Features
      - **Text Preprocessing:** NLTK, cleaning, tokenization.
      - **TF-IDF & VADER:** Feature extraction and sentiment scoring.
      - **Modeling:** Logistic Regression classifier.
      - **Visualization:** Data insights and charts.
      - **Web UI:** Built with Streamlit.
    `
  },
  {
    title: 'Fake News Detection',
    description: 'A machine learning project to classify news articles as real or fake using NLTK, TF-IDF, and Passive Aggressive Classifier.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=800&fit=crop&crop=center',
    tags: ['Python', 'NLP', 'Machine Learning', 'Fake News', 'NLTK', 'TF-IDF', 'PA Classifier'],
    liveUrl: '',
    githubUrl: 'https://github.com/Rabikiran67/Fake-News-Detection',
    details: `
      ### Overview
      Fake news detection pipeline with text cleaning, TF-IDF, and PA Classifier.

      ### Key Features
      - **Text Cleaning:** NLTK preprocessing.
      - **Feature Extraction:** TF-IDF vectorization.
      - **Classification:** Passive Aggressive Classifier.
    `
  },
  {
    title: 'Smart Attendance System',
    description: 'A machine learning-based smart attendance system using face recognition with OpenCV. Real-time attendance tracking via webcam, detecting and recognizing faces with Haar Cascade and the face_recognition library.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
    tags: ['Python', 'OpenCV', 'Face Recognition', 'Attendance', 'Machine Learning'],
    liveUrl: '',
    githubUrl: 'https://github.com/Rabikiran67/Smart-Attendance-System',
    details: `
      ### Overview
      Smart Attendance System leverages face recognition for real-time attendance tracking.

      ### Key Features
      - **Face Detection:** Haar Cascade, face_recognition library.
      - **Real-Time Tracking:** Webcam integration.
      - **Automated Attendance:** Accurate and efficient.
    `
  },
];

// --- CODE STRING FOR HOME PAGE ---
// This function generates the code string with dynamic data
export const getHomeCodeString = (personalInfo, techSkills) => {
  // Filter out unwanted skills and select key skills to display
  const filteredSkills = techSkills.filter(skill => 
    !['Redux'].includes(skill.name)
  );
  const keySkills = filteredSkills.slice(0, 9).map(skill => `'${skill.name}'`);
  const firstLine = keySkills.slice(0, 5).join(', ');
  const secondLine = keySkills.slice(5).join(', ');

  return `const coder = {
    name: '${personalInfo.name}',
    skills: [
        ${firstLine},
        ${secondLine}
    ],
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
    hireable: function() {
        return (
            this.hardWorker &&
            this.problemSolver &&
            this.skills.length >= 5
        );
    }
};  `;
};

// --- SPOTIFY "NOW PLAYING" DATA ---
// Use a real song you like! Find the album art URL by right-clicking the album on Spotify's web player and selecting "Copy link to album art".
export const spotifyData = {
  song: "Blinding Lights",
  artist: "The Weeknd",
  albumArtUrl: "/blinding-lights.png", // Your uploaded PNG image
};
