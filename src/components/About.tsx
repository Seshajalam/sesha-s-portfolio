'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import AnimatedCounter from './ui/AnimatedCounter';
import { stats } from '@/lib/data';
import { withBasePath } from '@/lib/paths';

export default function About() {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="Passionate about pushing the boundaries of AI and machine learning"
        />

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="absolute inset-0 gradient-border rounded-full animate-spin-slow opacity-75 blur-sm" />
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[var(--bg-primary)]">
                <Image
                  src={withBasePath('/images/profile.png')}
                  alt="Seshajalam G"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-bold mb-4">
              AI Engineer
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              AI Engineer with a Master&apos;s specialization in Artificial Intelligence and Machine
              Learning, experienced in building intelligent systems using Machine Learning, Deep
              Learning, Large Language Models (LLMs), and Computer Vision. Skilled in developing
              real-time AI applications including gesture recognition systems (MediaPipe + CNN-LSTM),
              LLM-powered chatbots, and object detection models such as RetinaNet and CheXNet for
              medical image analysis.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Hands-on experience with model training, feature engineering, data preprocessing, and
              deployment using Python, TensorFlow, Keras, OpenCV, NumPy, and Scikit-learn. Proficient
              in working with modern AI tools and frameworks, including GPT-based systems, LLaMA,
              Claude (Opus, Sonnet, Haiku), and Gemini for building scalable AI solutions.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Strong problem-solving mindset with a passion for continuous learning, AI innovation,
              and developing future-ready intelligent products that create real-world impact.
            </p>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ label, value, suffix }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="text-center" tilt>
                <AnimatedCounter target={value} suffix={suffix} />
                <p className="text-[var(--text-secondary)] mt-2 text-sm">{label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
