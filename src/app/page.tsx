'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CursorGlow from '@/components/CursorGlow';
import AIChatWidget from '@/components/AIChatWidget';

const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });

export default function Home() {
  return (
    <>
      <Scene />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <AIChatWidget />
      <WhatsAppButton />
    </>
  );
}
