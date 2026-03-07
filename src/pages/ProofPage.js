import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Proof from '../sections/Proof';

export default function ProofPage() {
  return (
    <PageTransition>
      <SEO
        title="Proof — 807 Reproducible Benchmark Tests"
        description="Frozen benchmark runs, reproducible test suites, and verifiable evidence from all 10 UCogNet cognitive modules. Every run is sealed with SHA-256 hashes."
        path="/proof"
      />
      <Proof />
    </PageTransition>
  );
}
