'use client';

import { FaArrowUp } from 'react-icons/fa';
import { socialLinks } from '@/lib/data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 px-4 border-t border-[var(--glass-border)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-[var(--text-secondary)] text-sm">
          &copy; {new Date().getFullYear()} Seshajalam G. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              aria-label={label}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-full glass hover:bg-[var(--accent-primary)]/20 transition-colors"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-[var(--accent-primary)]" />
        </button>
      </div>
    </footer>
  );
}
