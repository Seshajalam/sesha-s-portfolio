'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowDown } from 'react-icons/fa';
import Button from './ui/Button';
import { socialLinks } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center max-w-4xl"
      >
        <motion.p
          variants={itemVariants}
          className="text-[var(--accent-primary)] font-medium text-lg mb-4"
        >
          Welcome to my portfolio
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-display font-bold mb-6 leading-tight"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">Seshajalam G</span>
        </motion.h1>

        <motion.div variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl text-[var(--text-secondary)] mb-8 h-10">
          <TypeAnimation
            sequence={[
              'AI Engineer',
              2000,
              'Deep Learning Enthusiast',
              2000,
              'Computer Vision Developer',
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center mb-12">
          <Button href="#projects">View My Work</Button>
          <Button href="#contact" variant="outline">
            Get In Touch
          </Button>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center gap-6">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_8px_var(--accent-primary)]"
              aria-label={label}
            >
              <Icon size={24} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors">
          <FaArrowDown size={20} />
        </a>
      </motion.div>
    </section>
  );
}
