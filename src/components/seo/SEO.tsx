import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  schema?: object;
}

const SEO = ({
  title = 'Sathi - Professional Companion Service | Book Platonic Companionship in India',
  description = 'Sathi offers premium platonic companionship services in India. Book verified companions for events, outings, or simply to have someone present. Safe, professional, and judgment-free.',
  keywords = 'companion service India, platonic companionship, rent a friend India, professional companion, social companion Mumbai, Delhi companion service, lonely in India, event plus one, wedding companion',
  image = '/og-image.jpg',
  url = 'https://sathiapp.in',
  type = 'website',
  schema,
}: SEOProps) => {
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Sathi',
    description: description,
    url: url,
    logo: `${url}/logo.png`,
    image: `${url}${image}`,
    telephone: '+91-9999999999',
    email: 'support@sathiapp.in',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
      addressRegion: 'Maharashtra',
      addressLocality: 'Mumbai',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.0760',
      longitude: '72.8777',
    },
    areaServed: [
      { '@type': 'City', name: 'Mumbai' },
      { '@type': 'City', name: 'Delhi' },
      { '@type': 'City', name: 'Bangalore' },
      { '@type': 'City', name: 'Chennai' },
      { '@type': 'City', name: 'Hyderabad' },
    ],
    priceRange: '₹500 - ₹1000',
    openingHours: 'Mo-Su 08:00-22:00',
    sameAs: [
      'https://twitter.com/sathiapp',
      'https://instagram.com/sathiapp',
      'https://linkedin.com/company/sathi',
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sathi',
    url: url,
    logo: `${url}/logo.png`,
    description: 'Professional platonic companionship service in India',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Sathi Team',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9999999999',
      contactType: 'customer service',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Companion Service',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Sathi',
    },
    description: 'Book verified professional companions for platonic companionship. Perfect for events, outings, or when you need someone present.',
    areaServed: 'India',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Companion Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Silent & Observant Presence',
            description: 'Calm, peaceful companionship for quiet moments',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Comforting Presence',
            description: 'Supportive companionship during difficult times',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Public Event Plus-One',
            description: 'Professional companion for social events and gatherings',
          },
        },
      ],
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Sathi" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:site_name" content="Sathi" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${url}${image}`} />
      <meta name="twitter:site" content="@sathiapp" />

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
