import React from 'react';
import Hero from '../sections/Hero';
import Problems from '../sections/Problems';
import HowItWorks from '../sections/HowItWorks';
import Proof from '../sections/Proof';
import ResearchGallery from '../sections/ResearchGallery';
import Updates from '../sections/Updates';
import Contact from '../sections/Contact';

export default function Landing() {
  return (
    <>
      <Hero />
      <Problems />
      <HowItWorks />
      <Proof />
      <ResearchGallery />
      <Updates />
      <Contact />
    </>
  );
}
