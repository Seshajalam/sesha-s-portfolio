'use client';

import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { experience } from '@/lib/data';
import { FaBriefcase } from 'react-icons/fa';

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Professional Experience"
          subtitle="My career journey in AI and machine learning"
        />

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 gradient-border origin-top"
          />

          <div className="space-y-12">
            {experience.map((item, index) => (
              <motion.div
                key={`${item.role}-${item.period}`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative flex items-start gap-6 ml-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-8 -translate-x-1/2 w-12 h-12 rounded-full gradient-border flex items-center justify-center z-10 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                    <FaBriefcase className="text-[var(--accent-primary)]" />
                  </div>
                </div>

                {/* Content card */}
                <div className="ml-16 md:ml-20 flex-1">
                  <GlassCard tilt hover={false}>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-xl font-display font-bold">
                          {item.company}
                        </h3>
                        <p className="text-[var(--accent-primary)] font-medium">
                          {item.role}
                        </p>
                      </div>
                      <span className="text-[var(--text-secondary)] text-sm whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </GlassCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
