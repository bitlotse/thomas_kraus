const client = require("./client");
const site = require("./site");

module.exports = (() => {
  if (client.templateMode) {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: client.brand.name,
      url: site.url
    };
  }

  const organization = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: client.brand.name,
    url: site.url,
    email: client.contact.email,
    telephone: client.contact.phoneInternational,
    address: {
      "@type": "PostalAddress",
      streetAddress: client.address.street,
      postalCode: client.address.postalCode,
      addressLocality: client.address.locality,
      addressRegion: client.address.region,
      addressCountry: client.address.countryCode
    },
    areaServed: client.serviceArea.areas
  };

  const sameAs = [client.profiles.googleBusiness, ...client.profiles.social].filter(Boolean);
  if (sameAs.length) organization.sameAs = sameAs;
  return organization;
})();
