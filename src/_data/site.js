const client = require("./client");

module.exports = {
  language: "de",
  locale: "de_DE",
  url: "https://probenahme-bayern.de",
  titleSuffix: client.brand.name,
  defaultTitle: `${client.brand.name} | Trinkwasser und Hygiene`,
  defaultDescription: "Probenahme und Vor-Ort-Messungen für Wasser und Hygiene. Thomas Kraus in Anger, Bayern.",
  defaultImage: "/assets/images/homepage/water-hero.webp",
  robots: client.templateMode ? "noindex, nofollow" : "index, follow",
  themeColor: "#103852"
};
