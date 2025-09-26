"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github, Globe, MessageSquare } from 'lucide-react';
import { mockPersonalInfo } from '@/lib/mock-data';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

const Contact = () => {
  const [personalInfo] = useState(mockPersonalInfo);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    company: '',
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    setStatus({ type: 'loading' });

    try {
      // Simulate API call - In real implementation, this would submit to Sanity or your API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success
      setStatus({
        type: 'success',
        message: 'Thank you for your message! I\'ll get back to you within 24 hours.'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        phone: '',
        company: '',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact me directly.'
      });
    }
  };

  return (
    <section id="contact" className="py-20" data-testid="contact-section">
      <div className="section-padding container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="contact-title">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your project and how we can work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center" data-testid="get-in-touch-title">
                <MessageSquare className="mr-3 h-6 w-6 text-primary" />
                Get in Touch
              </h3>
              
              <p className="text-muted-foreground leading-relaxed mb-8" data-testid="contact-description">
                I'm always interested in hearing about new opportunities, creative projects, or just having a chat about technology. 
                Whether you're looking to build something amazing or need help with an existing project, feel free to reach out!
              </p>

              <div className="space-y-6" data-testid="contact-methods">
                {/* Email */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="contact-email-link"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Phone</p>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid="contact-phone-link"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                >
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Location</p>
                    <p className="text-muted-foreground" data-testid="contact-location">
                      {personalInfo.location}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <p className="font-semibold text-foreground mb-4">Connect with me:</p>
                <div className="flex space-x-4" data-testid="contact-social-links">
                  {personalInfo.linkedin && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                      data-testid="contact-linkedin-link"
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
                      className="p-3 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                      data-testid="contact-github-link"
                    >
                      <Github className="h-5 w-5" />
                    </motion.a>
                  )}
                  {personalInfo.website && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={personalInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
                      data-testid="contact-website-link"
                    >
                      <Globe className="h-5 w-5" />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-background rounded-xl p-6 sm:p-8 shadow-lg border border-border"
          >
            <h3 className="text-2xl font-bold mb-6" data-testid="contact-form-title">
              Send me a message
            </h3>

            {/* Status Messages */}
            {status.type !== 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-4 rounded-lg flex items-center ${
                  status.type === 'success' 
                    ? 'bg-green-500/10 text-green-600 border border-green-500/20' 
                    : status.type === 'error'
                    ? 'bg-red-500/10 text-red-600 border border-red-500/20'
                    : 'bg-primary/10 text-primary border border-primary/20'
                }`}
                data-testid="form-status-message"
              >
                {status.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                ) : status.type === 'error' ? (
                  <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                ) : (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-primary border-t-transparent mr-3 flex-shrink-0"></div>
                )}
                <span className="text-sm">{status.message}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                  placeholder="Your full name"
                  data-testid="contact-name-input"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                  placeholder="your.email@example.com"
                  data-testid="contact-email-input"
                />
              </div>

              {/* Phone (optional) */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                  Phone <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                  placeholder="+1 (555) 123-4567"
                  data-testid="contact-phone-input"
                />
              </div>

              {/* Company (optional) */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                  Company <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                  placeholder="Your company name"
                  data-testid="contact-company-input"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  disabled={status.type === 'loading'}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50"
                  placeholder="What's this about?"
                  data-testid="contact-subject-input"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={status.type === 'loading'}
                  rows={6}
                  className="w-full px-4 py-3 bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none disabled:opacity-50"
                  placeholder="Tell me about your project, ideas, or just say hello!"
                  data-testid="contact-message-input"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={status.type === 'loading'}
                whileHover={status.type !== 'loading' ? { scale: 1.02 } : {}}
                whileTap={status.type !== 'loading' ? { scale: 0.98 } : {}}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="contact-submit-button"
              >
                {status.type === 'loading' ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                I typically respond within 24 hours. For urgent matters, feel free to call me directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;