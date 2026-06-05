'use client';

import { motion } from 'framer-motion';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { education } from '@/lib/data';
import { FaGraduationCap } from 'react-icons/fa';

export default function Education() {
  return (
    <section id="education" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Education"
          subtitle="My academic journey"
        />

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 gradient-border origin-top"
          />

          <div className="space-y-12">
            {education.map((item, index) => (
              <motion.div
                key={item.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full gradient-border flex items-center justify-center z-10">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                    <FaGraduationCap className="text-[var(--accent-primary)]" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}
                >
                  <GlassCard tilt hover={false}>
                    <span className="text-[var(--accent-primary)] text-sm font-medium">
                      {item.period}
                    </span>
                    <h3 className="text-xl font-display font-bold mt-1 mb-1">
                      {item.degree}
                    </h3>
                    <p className="text-[var(--accent-secondary)] text-sm mb-3">
                      {item.institution}
                    </p>
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
