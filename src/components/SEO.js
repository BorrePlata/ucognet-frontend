import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE = 'https://ucognet.pro';
const DEFAULT_TITLE = 'UCogNet — Metacognitive AI That Improves Safely';
const DEFAULT_DESC = 'Modular metacognitive AI platform with gated evolution, safety budgets, and reproducible benchmarks. By Brainstream.';

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
      <meta property="og:site_name" content="UCogNet" />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  );
}
