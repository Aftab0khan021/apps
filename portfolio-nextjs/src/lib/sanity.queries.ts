import { groq } from 'next-sanity';

// Personal Information
export const personalInfoQuery = groq`
  *[_type == "personalInfo"][0] {
    _id,
    name,
    title,
    location,
    summary,
    avatar,
    email,
    phone,
    linkedin,
    github,
    website
  }
`;

// Experience Queries
export const experienceQuery = groq`
  *[_type == "experience" && isActive == true] | order(order asc, startDate desc) {
    _id,
    title,
    company,
    location,
    type,
    startDate,
    endDate,
    current,
    description,
    technologies,
    logo,
    featured,
    order
  }
`;

// Project Queries
export const projectsQuery = groq`
  *[_type == "project" && isActive == true] | order(order asc, completedDate desc) {
    _id,
    name,
    description,
    longDescription,
    image,
    gallery,
    technologies,
    tags,
    liveUrl,
    githubUrl,
    category,
    featured,
    order,
    completedDate,
    status
  }
`;

export const featuredProjectsQuery = groq`
  *[_type == "project" && isActive == true && featured == true] | order(order asc) [0...6] {
    _id,
    name,
    description,
    image,
    technologies,
    tags,
    liveUrl,
    githubUrl,
    category
  }
`;

// Skills Queries
export const skillsQuery = groq`
  *[_type == "skill" && isActive == true] | order(category asc, order asc, level desc) {
    _id,
    name,
    level,
    category,
    icon,
    color,
    yearsOfExperience,
    featured,
    order
  }
`;

export const skillsByCategoryQuery = groq`
  *[_type == "skill" && isActive == true] | order(order asc, level desc) {
    _id,
    name,
    level,
    category,
    icon,
    color,
    yearsOfExperience,
    featured
  } | group(category)
`;

// Certifications Query
export const certificationsQuery = groq`
  *[_type == "certification" && isActive == true] | order(order asc, issueDate desc) {
    _id,
    name,
    issuer,
    issueDate,
    expiryDate,
    credentialId,
    credentialUrl,
    image,
    description,
    skills,
    category,
    featured
  }
`;

// Education Query
export const educationQuery = groq`
  *[_type == "education" && isActive == true] | order(order asc, startDate desc) {
    _id,
    degree,
    field,
    institution,
    location,
    startDate,
    endDate,
    current,
    status,
    gpa,
    description,
    achievements,
    relevantCourses,
    logo
  }
`;

// Contact Messages (for admin)
export const contactMessagesQuery = groq`
  *[_type == "contactMessage"] | order(_createdAt desc) {
    _id,
    name,
    email,
    subject,
    message,
    phone,
    company,
    isRead,
    isReplied,
    priority,
    tags,
    source,
    _createdAt
  }
`;

// Single document queries
export const projectByIdQuery = groq`
  *[_type == "project" && _id == $id][0] {
    _id,
    name,
    description,
    longDescription,
    image,
    gallery,
    technologies,
    tags,
    liveUrl,
    githubUrl,
    category,
    completedDate,
    status
  }
`;

export const experienceByIdQuery = groq`
  *[_type == "experience" && _id == $id][0] {
    _id,
    title,
    company,
    location,
    type,
    startDate,
    endDate,
    current,
    description,
    technologies,
    logo
  }
`;