"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { mockExperiences } from '@/lib/mock-data';
import { formatDate, calculateDuration } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

const Experience = () => {
  const [experiences] = useState(mockExperiences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20">
        <div className="section-padding container-custom flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20" data-testid="experience-section">
      <div className="section-padding container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="experience-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the exciting projects I've worked on
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>

            <div className="space-y-12" data-testid="experience-timeline">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience._id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative"
                  data-testid={`experience-item-${index}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background z-10 shadow-lg"></div>
                  
                  {/* Experience card */}
                  <div className="ml-20">
                    <div className="bg-background rounded-xl p-6 sm:p-8 shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:border-primary/20">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-xl sm:text-2xl font-bold text-foreground mr-3" data-testid={`exp-title-${index}`}>
                              {experience.title}
                            </h3>
                            {experience.current && (
                              <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs font-medium px-2 py-1 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <div className="flex items-center text-primary font-semibold" data-testid={`exp-company-${index}`}>
                              <Briefcase className="h-4 w-4 mr-2" />
                              {experience.company}
                            </div>
                            <span className="hidden sm:inline text-muted-foreground">•</span>
                            <div className="flex items-center text-muted-foreground text-sm" data-testid={`exp-location-${index}`}>
                              <MapPin className="h-4 w-4 mr-1" />
                              {experience.location}
                            </div>
                            <span className="hidden sm:inline text-muted-foreground">•</span>
                            <div className="text-muted-foreground text-sm capitalize" data-testid={`exp-type-${index}`}>
                              {experience.type.replace('-', ' ')}
                            </div>
                          </div>

                          <div className="flex items-center text-sm text-muted-foreground mb-4" data-testid={`exp-duration-${index}`}>
                            <Calendar className="h-4 w-4 mr-2" />
                            {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate!)}
                            <span className="mx-2">•</span>
                            {calculateDuration(experience.startDate, experience.endDate, experience.current)}
                          </div>
                        </div>

                        {/* Company logo placeholder */}
                        <div className="flex-shrink-0 mt-4 lg:mt-0">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            <Briefcase className="h-8 w-8 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      {/* Job description */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Key Responsibilities & Achievements:</h4>
                        <ul className="space-y-2" data-testid={`exp-description-${index}`}>
                          {experience.description.map((item, descIndex) => (
                            <motion.li
                              key={descIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: descIndex * 0.1 }}
                              className="flex items-start text-muted-foreground"
                            >
                              <span className="text-primary mr-3 mt-2">•</span>
                              <span>{item}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Technologies & Tools:</h4>
                        <div className="flex flex-wrap gap-2" data-testid={`exp-technologies-${index}`}>
                          {experience.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={techIndex}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4, delay: techIndex * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full hover:bg-primary/20 transition-colors cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {experience.featured && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center text-sm text-primary">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            <span className="font-medium">Featured Position</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-6">
              Interested in working together or want to know more about my experience?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="contact-from-experience-button"
            >
              Let's Discuss Opportunities
              <ExternalLink className="ml-2 h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;