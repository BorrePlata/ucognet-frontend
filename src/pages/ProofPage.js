import React from 'react';
import PageTransition from '../components/PageTransition';
import SEO from '../components/SEO';
import Proof from '../sections/Proof';

export default function ProofPage() {
  return (
    <PageTransition>
      <SEO
        title="Proof — Reproducible Benchmarks & 405 BCI Evaluations"
        description="Frozen benchmark runs, reproducible test suites, and verifiable evidence. BCI rigorous evaluation: 8 models, 9 subjects × 5 seeds, Wilcoxon paired tests with 95% CI."
        path="/proof"
      />
      <Proof />
    </PageTransition>
  );
}
