"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, ExternalLink, Badge, Star, Clock } from 'lucide-react';
import { mockCertifications } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

const Certifications = () => {
  const [certifications] = useState(mockCertifications);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="certifications" className="py-20 bg-muted/30">
        <div className="section-padding container-custom flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  const categories = ['all', ...Array.from(new Set(certifications.map(cert => cert.category)))];
  const filteredCertifications = filter === 'all' 
    ? certifications 
    : certifications.filter(cert => cert.category === filter);

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    return new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate: string | null) => {
    if (!expiryDate) return false;
    const expiry = new Date(expiryDate);
    const now = new Date();
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(now.getMonth() + 6);
    return expiry > now && expiry < sixMonthsFromNow;
  };

  return (
    <section id="certifications" className="py-20 bg-muted/30" data-testid="certifications-section">
      <div className="section-padding container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="certifications-title">
            <span className="gradient-text">Certifications</span> & Achievements
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Professional certifications and achievements that validate my expertise
          </p>

          {/* Filter buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
            data-testid="certification-filters"
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
                <Award className="inline h-4 w-4 mr-2" />
                {category === 'all' ? 'All Certifications' : category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" data-testid="certifications-grid">
          {filteredCertifications.map((certification, index) => (
            <motion.div
              key={certification._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-background rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300 hover:border-primary/20"
              data-testid={`certification-card-${index}`}
            >
              {/* Certificate Badge/Image */}
              <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/20 flex items-center justify-center p-8">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    {certification.featured && (
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    )}
                    <Badge className="h-4 w-4 text-primary" />
                  </div>
                </div>

                {/* Status indicators */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {certification.featured && (
                    <span className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 text-xs font-medium px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  {certification.expiryDate && (
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      isExpired(certification.expiryDate)
                        ? 'bg-red-500/20 text-red-700 dark:text-red-400'
                        : isExpiringSoon(certification.expiryDate)
                        ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                        : 'bg-green-500/20 text-green-700 dark:text-green-400'
                    }`}>
                      {isExpired(certification.expiryDate) ? 'Expired' : 'Valid'}
                    </span>
                  )}
                </div>
              </div>

              {/* Certification Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight" data-testid={`cert-name-${index}`}>
                    {certification.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-1" data-testid={`cert-issuer-${index}`}>
                    {certification.issuer}
                  </p>
                  
                  <div className="flex items-center text-xs text-muted-foreground mb-2" data-testid={`cert-date-${index}`}>
                    <Calendar className="h-3 w-3 mr-1" />
                    Issued: {formatDate(certification.issueDate)}
                    {certification.expiryDate && (
                      <>
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        Expires: {formatDate(certification.expiryDate)}
                      </>
                    )}
                  </div>
                </div>

                {certification.description && (
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed" data-testid={`cert-description-${index}`}>
                    {certification.description}
                  </p>
                )}

                {/* Skills covered */}
                {certification.skills && certification.skills.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-foreground mb-2">Skills Covered:</p>
                    <div className="flex flex-wrap gap-2" data-testid={`cert-skills-${index}`}>
                      {certification.skills.slice(0, 4).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                      {certification.skills.length > 4 && (
                        <span className="text-xs text-muted-foreground px-2 py-1">
                          +{certification.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Credential info */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex flex-col">
                    {certification.credentialId && (
                      <span className="text-xs text-muted-foreground" data-testid={`cert-id-${index}`}>
                        ID: {certification.credentialId}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground capitalize">
                      {certification.category}
                    </span>
                  </div>

                  {certification.credentialUrl && (
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                      data-testid={`cert-verify-link-${index}`}
                    >
                      Verify
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl p-8 text-center"
          data-testid="certifications-summary"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{certifications.length}</div>
              <div className="text-muted-foreground">Total Certifications</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {certifications.filter(cert => cert.featured).length}
              </div>
              <div className="text-muted-foreground">Featured</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {certifications.filter(cert => !cert.expiryDate || !isExpired(cert.expiryDate)).length}
              </div>
              <div className="text-muted-foreground">Valid</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{categories.length - 1}</div>
              <div className="text-muted-foreground">Categories</div>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-muted-foreground mb-4">
              Continuous learning and professional development are key to staying current in technology
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.querySelector('#contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              data-testid="discuss-qualifications-button"
            >
              Discuss My Qualifications
              <ExternalLink className="ml-2 h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;