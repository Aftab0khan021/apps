"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, MapPin, Mail, Phone, Globe } from 'lucide-react';
import Image from 'next/image';
import { mockPersonalInfo, mockEducation } from '@/lib/mock-data';
import { formatDate, calculateDuration } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

const About = () => {
  const [personalInfo] = useState(mockPersonalInfo);
  const [education] = useState(mockEducation);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="about" className="py-20 bg-muted/30">
        <div className="section-padding container-custom flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-muted/30" data-testid="about-section">
      <div className="section-padding container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="about-title">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what skills I have
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center" data-testid="get-to-know-title">
                <BookOpen className="mr-3 h-6 w-6 text-primary" />
                Get to know me!
              </h3>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p data-testid="about-description-1">
                  I'm a <strong className="text-foreground">Full Stack Developer</strong> passionate about building 
                  exceptional digital experiences. With over 4 years of experience in web development, 
                  I specialize in creating scalable, user-friendly applications that solve real-world problems.
                </p>
                
                <p data-testid="about-description-2">
                  My journey in web development started during my engineering studies, and since then, 
                  I've had the privilege of working with amazing teams to build products that impact 
                  thousands of users. I believe in writing clean, maintainable code and following 
                  industry best practices.
                </p>
                
                <p data-testid="about-description-3">
                  When I'm not coding, you can find me exploring new technologies, contributing to 
                  open-source projects, or sharing my knowledge with the developer community. 
                  I'm always eager to take on new challenges and collaborate on exciting projects.
                </p>
              </div>

              {/* Contact Info */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="contact-info">
                <div className="flex items-center space-x-3 text-sm">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">{personalInfo.location}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                  <a 
                    href={`mailto:${personalInfo.email}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid="about-email-link"
                  >
                    {personalInfo.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <a 
                    href={`tel:${personalInfo.phone}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid="about-phone-link"
                  >
                    {personalInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Globe className="h-4 w-4 text-primary flex-shrink-0" />
                  <a 
                    href={personalInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid="about-website-link"
                  >
                    Portfolio Website
                  </a>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <button
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  data-testid="contact-me-button"
                >
                  Let's Connect
                  <Mail className="ml-2 h-4 w-4" />
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center" data-testid="education-title">
                <GraduationCap className="mr-3 h-6 w-6 text-primary" />
                Education
              </h3>

              <div className="space-y-6" data-testid="education-list">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-background rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
                    data-testid={`education-item-${index}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <GraduationCap className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1" data-testid={`edu-degree-${index}`}>
                              {edu.degree}
                            </h4>
                            <p className="text-primary font-medium mb-1" data-testid={`edu-field-${index}`}>
                              {edu.field}
                            </p>
                            <p className="text-muted-foreground text-sm mb-2" data-testid={`edu-institution-${index}`}>
                              {edu.institution} • {edu.location}
                            </p>
                            <p className="text-xs text-muted-foreground mb-3" data-testid={`edu-duration-${index}`}>
                              {formatDate(edu.startDate, 'long')} - {edu.endDate ? formatDate(edu.endDate, 'long') : 'Present'} 
                              • {calculateDuration(edu.startDate, edu.endDate, edu.current)}
                            </p>
                          </div>
                          {edu.gpa && (
                            <div className="text-right">
                              <p className="text-sm font-medium text-primary" data-testid={`edu-gpa-${index}`}>
                                {edu.gpa}
                              </p>
                              <p className="text-xs text-muted-foreground">GPA</p>
                            </div>
                          )}
                        </div>

                        {edu.description && (
                          <p className="text-sm text-muted-foreground mb-3" data-testid={`edu-description-${index}`}>
                            {edu.description}
                          </p>
                        )}

                        {edu.achievements && edu.achievements.length > 0 && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-foreground mb-2">Key Achievements:</p>
                            <ul className="text-sm text-muted-foreground space-y-1" data-testid={`edu-achievements-${index}`}>
                              {edu.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start">
                                  <span className="text-primary mr-2">•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                          <div>
                            <p className="text-sm font-medium text-foreground mb-2">Relevant Courses:</p>
                            <div className="flex flex-wrap gap-2" data-testid={`edu-courses-${index}`}>
                              {edu.relevantCourses.slice(0, 6).map((course, courseIndex) => (
                                <span
                                  key={courseIndex}
                                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-md"
                                >
                                  {course}
                                </span>
                              ))}
                              {edu.relevantCourses.length > 6 && (
                                <span className="text-xs text-muted-foreground px-2 py-1">
                                  +{edu.relevantCourses.length - 6} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;