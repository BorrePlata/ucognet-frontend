import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE = 'https://ucognet.pro';
const DEFAULT_TITLE = 'UCogNet — Universal Cognition Network | Metacognitive AI That Improves Safely';
const DEFAULT_DESC = 'UCogNet (Universal Cognition Network) is a modular metacognitive AI platform with gated evolution, safety budgets, and reproducible benchmarks for BCI and physical control. By Brainstream.';

/**
 * Per-page SEO component. Renders <title>, meta description, canonical, OG, and Twitter tags.
 *
 * @param {string} title   – Page title (appended with " | UCogNet")
 * @param {string} description – Meta description (max ~155 chars)
 * @param {string} path    – Path like "/safety" (used for canonical + og:url)
 * @param {string} [type]  – og:type, default "website"
 */
export default function SEO({ title, description, path = '/', type = 'website' }) {
  const fullTitle = title ? `${title} | UCogNet` : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESC;
  const url = `${SITE}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="UCogNet — Universal Cognition Network" />
      <meta property="og:image" content={`${SITE}/benchmarks/ucognet_11_architecture_pyramid.png`} />
      <meta property="og:image:alt" content="UCogNet Architecture Pyramid" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={`${SITE}/benchmarks/ucognet_11_architecture_pyramid.png`} />
    </Helmet>
  );
}
