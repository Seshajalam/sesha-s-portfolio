'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import GlassCard from './ui/GlassCard';
import { contactInfo } from '@/lib/data';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Invalid email address';
    if (!formData.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formsubmit.co/ajax/seshajalamg@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact from ${formData.name}`,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const infoItems = [
    { icon: FaEnvelope, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: FaPhone, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
    { icon: FaMapMarkerAlt, label: 'Location', value: contactInfo.location },
  ];

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a question or want to collaborate? Feel free to reach out!"
        />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-bold mb-6">
              Let&apos;s Connect
            </h3>
            {infoItems.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-border flex items-center justify-center flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[var(--bg-primary)] flex items-center justify-center">
                    <Icon className="text-[var(--accent-primary)]" />
                  </div>
                </div>
                <div>
                  <p className="text-[var(--text-secondary)] text-sm">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="font-medium hover:text-[var(--accent-primary)] transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard hover={false} tilt>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--glass-border)] focus:border-[var(--accent-primary)] focus:outline-none transition-colors resize-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]"
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 rounded-full font-medium bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white hover:shadow-lg hover:shadow-[var(--accent-primary)]/25 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? (
                    'Sending...'
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </button>
                {status === 'success' && (
                  <p className="text-green-400 text-center text-sm">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-red-400 text-center text-sm">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
