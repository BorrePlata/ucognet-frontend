import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Contact from '../sections/Contact';

export default function ContactPage() {
  return (
    <PageTransition>
      <SEO
        title="Contact — Request a Demo or Research Collaboration"
        description="Get in touch with UCogNet Lab for investment, research collaboration, licensing, or integration inquiries. Contact orion@brainstream.pro."
        path="/contact"
      />
      <Contact />
    </PageTransition>
  );
}
