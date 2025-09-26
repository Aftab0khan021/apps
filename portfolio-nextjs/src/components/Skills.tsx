"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, Wrench, Smartphone, Palette, Users, Star } from 'lucide-react';
import { mockSkills } from '@/lib/mock-data';
import { getSkillLevelColor } from '@/lib/utils';
import LoadingSpinner from './LoadingSpinner';

const Skills = () => {
  const [skills] = useState(mockSkills);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="skills" className="py-20">
        <div className="section-padding container-custom flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Category icons mapping
  const categoryIcons = {
    'Programming Languages': Code,
    'Frontend Development': Palette,
    'Backend Development': Server,
    'Database': Database,
    'DevOps & Tools': Wrench,
    'Mobile Development': Smartphone,
    'Soft Skills': Users,
  };

  const categories = Object.keys(skillsByCategory);
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skillsByCategory[activeCategory] || [];

  return (
    <section id="skills" className="py-20" data-testid="skills-section">
      <div className="section-padding container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" data-testid="skills-title">
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Technologies and tools I use to bring ideas to life
          </p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
            data-testid="skills-category-filters"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
              }`}
              data-testid="filter-all-skills"
            >
              <Star className="inline h-4 w-4 mr-2" />
              All Skills
            </motion.button>
            {categories.map((category) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code;
              return (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'bg-background text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                  }`}
                  data-testid={`filter-${category.toLowerCase().replace(/[\s&]/g, '-')}`}
                >
                  <IconComponent className="inline h-4 w-4 mr-2" />
                  {category}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Skills Display */}
        {activeCategory === 'all' ? (
          // Show all categories with their skills
          <div className="space-y-12" data-testid="all-skills-categories">
            {categories.map((category, categoryIndex) => {
              const IconComponent = categoryIcons[category as keyof typeof categoryIcons] || Code;
              const categorySkills = skillsByCategory[category];
              
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  className="bg-background rounded-xl p-6 sm:p-8 shadow-lg border border-border"
                  data-testid={`skill-category-${category.toLowerCase().replace(/[\s&]/g, '-')}`}
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">{category}</h3>
                    <span className="ml-3 bg-muted text-muted-foreground text-sm px-2 py-1 rounded-full">
                      {categorySkills.length} skills
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: skillIndex * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-muted/50 rounded-lg p-4 hover:bg-muted/70 transition-all duration-300"
                        data-testid={`skill-item-${skill.name.toLowerCase().replace(/[\s.]/g, '-')}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-foreground">{skill.name}</h4>
                          {skill.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Proficiency</span>
                            <span className="font-medium text-foreground">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-border rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: skillIndex * 0.1 }}
                              className={`h-2 rounded-full ${getSkillLevelColor(skill.level)}`}
                              style={{ backgroundColor: skill.color || undefined }}
                            />
                          </div>
                        </div>

                        {skill.yearsOfExperience && (
                          <div className="text-xs text-muted-foreground">
                            {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} experience
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          // Show skills for selected category
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background rounded-xl p-6 sm:p-8 shadow-lg border border-border"
            data-testid={`selected-category-${activeCategory.toLowerCase().replace(/[\s&]/g, '-')}`}
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-primary/10 rounded-lg mr-4">
                {React.createElement(categoryIcons[activeCategory as keyof typeof categoryIcons] || Code, {
                  className: "h-6 w-6 text-primary"
                })}
              </div>
              <h3 className="text-2xl font-bold text-foreground">{activeCategory}</h3>
              <span className="ml-3 bg-muted text-muted-foreground text-sm px-2 py-1 rounded-full">
                {filteredSkills.length} skills
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-muted/50 rounded-lg p-6 hover:bg-muted/70 transition-all duration-300 text-center group"
                  data-testid={`filtered-skill-${skill.name.toLowerCase().replace(/[\s.]/g, '-')}`}
                >
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Code className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-semibold text-foreground mb-1 flex items-center justify-center">
                      {skill.name}
                      {skill.featured && (
                        <Star className="h-4 w-4 text-yellow-500 fill-current ml-2" />
                      )}
                    </h4>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Level</span>
                      <span className="font-medium text-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-2 rounded-full bg-primary"
                        style={{ backgroundColor: skill.color || undefined }}
                      />
                    </div>
                  </div>

                  {skill.yearsOfExperience && (
                    <div className="text-xs text-muted-foreground">
                      {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} experience
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-xl p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div data-testid="skills-stats-years">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div data-testid="skills-stats-technologies">
                <div className="text-3xl font-bold text-primary mb-2">{skills.length}+</div>
                <div className="text-muted-foreground">Technologies</div>
              </div>
              <div data-testid="skills-stats-categories">
                <div className="text-3xl font-bold text-primary mb-2">{categories.length}</div>
                <div className="text-muted-foreground">Skill Categories</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;