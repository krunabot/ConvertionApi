import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://omni-convert.com";
const SITE_NAME = "OmniConvert Premium";

export default function Seo({ title, description, path = "/", noIndex = false, structuredData }) {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "/" : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {noIndex && <meta name="robots" content="noindex, follow" />}
      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}
