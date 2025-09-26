"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, ExternalLink, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { client } from '@/lib/sanity.client';
import { personalInfoQuery } from '@/lib/sanity.queries';
import { getOptimizedImage } from '@/lib/sanity.image';
import LoadingSpinner from './LoadingSpinner';

interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  summary: string;
  avatar: any;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

const Hero = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const data = await client.fetch(personalInfoQuery);
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
        // Fallback data
        setPersonalInfo({
          name: 'Aftab Pathan',
          title: 'Full Stack Developer',
          location: 'Mumbai, India',
          summary: 'Passionate full-stack developer with expertise in modern web technologies. Creating innovative solutions and seamless user experiences.',
          avatar: null,
          email: 'aftab@example.com',
          github: 'https://github.com/aftab0khan021',
          linkedin: 'https://linkedin.com/in/aftabpathan',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </section>
    );
  }

  if (!personalInfo) {
    return null;
  }

  const optimizedAvatar = personalInfo.avatar ? getOptimizedImage(personalInfo.avatar, 400, 400) : null;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" data-testid="hero-section">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="section-padding container-custom pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4"
            >
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Welcome to my portfolio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              data-testid="hero-name"
            >
              Hi, I'm{' '}
              <span className="gradient-text">
                {personalInfo.name}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl sm:text-2xl text-primary font-semibold mb-4"
              data-testid="hero-title"
            >
              {personalInfo.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-muted-foreground mb-2"
              data-testid="hero-location"
            >
              📍 {personalInfo.location}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg text-muted-foreground mb-8 max-w-2xl"
              data-testid="hero-summary"
            >
              {personalInfo.summary}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('#projects')}
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                data-testid="view-work-button"
              >
                View My Work
                <ExternalLink className="ml-2 h-4 w-4" />
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-border bg-background hover:bg-muted rounded-lg font-semibold transition-colors"
                data-testid="download-resume-button"
              >
                Download Resume
                <Download className="ml-2 h-4 w-4" />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex justify-center lg:justify-start space-x-4"
              data-testid="social-links"
            >
              {personalInfo.email && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={`mailto:${personalInfo.email}`}
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  data-testid="email-link"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              )}
              {personalInfo.linkedin && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  data-testid="linkedin-link"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
              )}
              {personalInfo.github && (
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                  data-testid="github-link"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-20 blur-md"
              ></motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
                data-testid="profile-image"
              >
                {optimizedAvatar ? (
                  <Image
                    src={optimizedAvatar.src}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL={optimizedAvatar.blurDataURL}
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-6xl font-bold text-muted-foreground">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={() => scrollToSection('#about')}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            data-testid="scroll-indicator"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowDown className="h-6 w-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;