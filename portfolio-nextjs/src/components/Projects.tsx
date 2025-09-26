"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Calendar, Eye, Filter } from 'lucide-react';
import Image from 'next/image';
import { mockProjects } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

const Projects = () => {
  const [projects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="projects" className="py-20 bg-muted/30">
        <div className="section-padding container-custom flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))];
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" className="py-20 bg-muted/30" data-testid="projects-section">
      <div className="section-padding container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="projects-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Here are some of the projects I've worked on. Each project showcases different skills and technologies.
          </p>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
            data-testid="project-filters"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                }`}
                data-testid={`filter-${category}`}
              >
                <Filter className="inline h-4 w-4 mr-2" />
                {category === 'all' ? 'All Projects' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          data-testid="projects-grid"
        >
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project._id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-background rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:border-primary/20"
                data-testid={`project-card-${index}`}
              >
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-3 bg-primary/20 rounded-lg flex items-center justify-center">
                        <Eye className="h-8 w-8 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">Project Preview</p>
                    </div>
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex space-x-3">
                      {project.liveUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                          data-testid={`project-live-link-${index}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-background text-foreground rounded-full hover:bg-muted transition-colors"
                          data-testid={`project-github-link-${index}`}
                        >
                          <Github className="h-4 w-4" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors" data-testid={`project-name-${index}`}>
                        {project.name}
                      </h3>
                      {project.completedDate && (
                        <div className="flex items-center text-xs text-muted-foreground mb-2" data-testid={`project-date-${index}`}>
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(project.completedDate)}
                        </div>
                      )}
                    </div>
                    {project.featured && (
                      <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed" data-testid={`project-description-${index}`}>
                    {project.description}
                  </p>

                  {/* Project Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4" data-testid={`project-tags-${index}`}>
                      {project.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2" data-testid={`project-technologies-${index}`}>
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        project.status === 'completed' ? 'bg-green-500' :
                        project.status === 'in-progress' ? 'bg-yellow-500' :
                        'bg-gray-400'
                      }`}></div>
                      <span className="text-xs text-muted-foreground capitalize" data-testid={`project-status-${index}`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:text-primary/80 transition-colors"
                          data-testid={`project-view-live-${index}`}
                        >
                          View Live
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                          data-testid={`project-view-code-${index}`}
                        >
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Show More/Less Button */}
        {filteredProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center px-6 py-3 border border-border bg-background hover:bg-muted rounded-lg font-semibold transition-colors"
              data-testid="show-more-projects-button"
            >
              {showAll ? 'Show Less Projects' : `Show All ${filteredProjects.length} Projects`}
              <Eye className="ml-2 h-4 w-4" />
            </motion.button>
          </motion.div>
        )}

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Interested in collaborating on a project or have an idea you'd like to discuss?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.querySelector('#contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="start-project-button"
          >
            Start a Project Together
            <ExternalLink className="ml-2 h-4 w-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;