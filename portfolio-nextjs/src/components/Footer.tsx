"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Phone, MapPin, ExternalLink, ArrowUp, Github, Linkedin, Globe } from 'lucide-react';
import { mockPersonalInfo } from '@/lib/mock-data';

const Footer = () => {
  const [personalInfo] = useState(mockPersonalInfo);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Web Development',
    'Frontend Development',
    'Backend Development',
    'Full Stack Solutions',
    'API Development',
    'Database Design',
    'UI/UX Implementation',
    'Performance Optimization',
  ];

  return (
    <footer className="bg-background border-t border-border" data-testid="main-footer">
      <div className="section-padding container-custom">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex items-center space-x-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold gradient-text cursor-pointer"
                onClick={() => scrollToSection('#hero')}
                data-testid="footer-logo"
              >
                {personalInfo.name}
              </motion.div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed max-w-md" data-testid="footer-description">
              {personalInfo.title} passionate about creating exceptional digital experiences. 
              I help businesses and individuals bring their ideas to life through modern web technologies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 pt-4" data-testid="footer-contact-info">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href={`mailto:${personalInfo.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-email-link"
                >
                  {personalInfo.email}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a 
                  href={`tel:${personalInfo.phone}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-phone-link"
                >
                  {personalInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground" data-testid="footer-location">
                  {personalInfo.location}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4" data-testid="footer-social-links">
              {personalInfo.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  data-testid="footer-linkedin-link"
                >
                  <Linkedin className="h-4 w-4" />
                </motion.a>
              )}
              {personalInfo.github && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  data-testid="footer-github-link"
                >
                  <Github className="h-4 w-4" />
                </motion.a>
              )}
              {personalInfo.website && (
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  data-testid="footer-website-link"
                >
                  <Globe className="h-4 w-4" />
                </motion.a>
              )}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground" data-testid="footer-quick-links-title">
              Quick Links
            </h4>
            <ul className="space-y-3" data-testid="footer-quick-links">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm block"
                    data-testid={`footer-link-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-foreground" data-testid="footer-services-title">
              Services
            </h4>
            <ul className="space-y-3" data-testid="footer-services">
              {services.slice(0, 6).map((service, index) => (
                <motion.li
                  key={service}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="text-muted-foreground text-sm"
                  data-testid={`footer-service-${index}`}
                >
                  {service}
                </motion.li>
              ))}
              <li className="text-muted-foreground text-sm">
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-primary transition-colors inline-flex items-center"
                  data-testid="footer-more-services-link"
                >
                  And more...
                  <ExternalLink className="h-3 w-3 ml-1" />
                </button>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-border pt-8 pb-4"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground" data-testid="footer-copyright">
              <span>© {currentYear} {personalInfo.name}. Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>using Next.js & Tailwind CSS</span>
            </div>

            {/* Back to top */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="back-to-top-button"
            >
              <span>Back to top</span>
              <ArrowUp className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Additional info */}
          <div className="mt-4 pt-4 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground" data-testid="footer-additional-info">
              This portfolio is built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Sanity CMS. 
              Deployed on Vercel with love for modern web development.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;