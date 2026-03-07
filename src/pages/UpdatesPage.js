import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Updates from '../sections/Updates';

export default function UpdatesPage() {
  return (
    <PageTransition>
      <SEO
        title="Updates — Research Timeline & Milestones"
        description="Latest research updates, milestones, and development timeline for the UCogNet metacognitive AI platform."
        path="/updates"
      />
      <Updates />
    </PageTransition>
  );
}
